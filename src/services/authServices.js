import axios from "axios";

const register = async (user) => {
  try {
    const { status } = await axios.post("/api/register", user);
    if (status == 201) {
      console.log(
        "authService:register() Success: ",
        user.username,
        " successfully registerd."
      );
      return { isRegistered: true, error: null };
    } else {
      console.error("authService:register() Error");
      return { isRegistered: false, error: null };
    }
  } catch (error) {
    console.error("authService:register() Error: ", error.response.statusText);
    return { isRegistered: false, error: error.response.statusText };
  }
};

const login = async (username, password) => {
  try {
    const { data } = await axios.post("/api/login", {
      username: username,
      password: password,
    });

    if (data && data.jwtToken.length) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("jwtToken", JSON.stringify(data.jwtToken));
      console.log("authService:login() Success: ", data.user);
      return data;
    } else {
      console.error("authService:login() Error: ", data);
      return data;
    }
  } catch (error) {
    console.error("authService:login() Error: ", error.response.statusText);
    return error.response;
  }
};

const authServices = { register, login };
export default authServices;
