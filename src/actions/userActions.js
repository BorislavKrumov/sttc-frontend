import * as userConstants from "../constants/usersConstants";
import userServices from "../services/usersServices";

export const fetchUsers = async (dispatch, token) => {
    dispatch({ type: userConstants.FETCH_USERS_REQUEST });
    const data = await userServices.fetchUsers(token);
    if (data) {
      return dispatch({
        type: userConstants.FETCH_USERS_SUCCESS,
        payload: data,
      });
    } else {
      return dispatch({
        type: userConstants.FETCH_USERS_FAILURE,
        payload: data,
      });
    }
  };
  