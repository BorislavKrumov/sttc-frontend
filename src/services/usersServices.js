import axios from "axios";

export const fetchUsers = async (token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.get("/api/manage/users", config);
    console.log("usersService:fetchUsers() Success: ", data);
    return data;
  } catch (error) {
    console.error(
      "usersService:fetchUsers() Error: ",
      error.response.statusText
    );
    return error.response.statusText;
  }
};

export const updateUser = async (user, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.put("/api/manage/users", user, config);
    console.log("usersService:updateUser() Success: ", data);
    return data;
  } catch (error) {
    console.error(
      "usersService:updateUser() Error: ",
      error.response.statusText
    );
    return error.response.statusText;
  }
};


const usersService = { fetchUsers, updateUser };
export default usersService;
