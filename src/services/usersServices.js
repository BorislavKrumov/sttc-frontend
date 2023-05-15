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

const usersService = { fetchUsers };
export default usersService;
