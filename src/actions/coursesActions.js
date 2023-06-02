import * as courseConstants from "../constants/coursesConstants";
import courseServices from "../services/coursesServices";

export const addCourse = async (dispatch, course, token) => {
  dispatch({ type: courseConstants.ADD_COURSE_REQUEST });
  const { data, isAdded, error } = await courseServices.addCourse(
    course,
    token
  );
  if (isAdded) {
    return dispatch({
      type: courseConstants.ADD_COURSE_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: courseConstants.ADD_COURSE_FAILURE,
      payload: error,
    });
  }
};

export const fetchCourses = async (dispatch, token) => {
  dispatch({ type: courseConstants.FETCH_COURSES_REQUEST });
  const data = await courseServices.fetchCourses(token);
  if (data) {
    return dispatch({
      type: courseConstants.FETCH_COURSES_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: courseConstants.FETCH_COURSES_FAILURE,
      payload: data,
    });
  }
};

export const updateCourse = async (dispatch, course, token) => {
  dispatch({ type: courseConstants.UPDATE_COURSE_REQUEST });
  const { data, isUpdated, error } = await courseServices.updateCourse(
    course,
    token
  );
  if (isUpdated) {
    return dispatch({
      type: courseConstants.UPDATE_COURSE_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: courseConstants.UPDATE_COURSE_FAILURE,
      payload: error,
    });
  }
};

export const deleteCourse = async (dispatch, id, token) => {
  dispatch({ type: courseConstants.DELETE_COURSE_REQUEST });
  const { isDeleted, error } = await courseServices.deleteCourse(
    id,
    token
  );
  if (isDeleted) {
    return dispatch({
      type: courseConstants.DELETE_COURSE_SUCCESS,
      payload: id,
    });
  } else {
    return dispatch({
      type: courseConstants.DELETE_COURSE_FAILURE,
      payload: error,
    });
  }
};
