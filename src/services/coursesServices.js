import axios from "axios";

const fetchCourses = async (token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.get("/api/course/", config);
    console.log("courseService:fetchCourse() Success: ", data);
    return data;
  } catch (error) {
    console.error( 
      "courseService:fetchCourse() Error: ",
      error.response.statusText
    );
    return error.response;
  }
};

const addCourse = async (course, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.post("/api/course/", course, config);
    console.log("courseService:addCourse() Success: ", data);
    return { data: data, isAdded: true, error: null };
  } catch (error) {
    console.error(
      "courseService:addCourse() Error: ",
      error.response.statusText
    );
    return { data: null, isAdded: false, error: error.response.statusText };
  }
};

const deleteCourse = async (id, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.delete(`/api/course/${id}/`, config);
    console.log("courseService:deleteCourse()  Success: ", data);
    return {
      isDeleted: true,
      error: null,
    };
  } catch (error) {
    console.error(
      "ourseService:deleteCourse()  Error: ",
      error.response.statusText
    );
    return {
      isDeleted: false,
      error: error.response.statusText,
    };
  }
};

const updateCourse = async (course, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.put(
      `/api/course/${course.id}/`,
      course,
      config
    );
    console.log("courseService:updateCourse()  Success: ", data);
    return {
      data: data,
      isUpdated: true,
      error: null,
    };
  } catch (error) {
    console.error(
      "courseService:updateCourse()  Error: ",
      error.response.statusText
    );
    return {
      data: null,
      isUpdated: false,
      error: error.response.statusText,
    };
  }
};

const coursesService = {
  addCourse,
  fetchCourses,
  updateCourse,
  deleteCourse,
};
export default coursesService;
