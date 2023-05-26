import * as userConstants from "../constants/usersConstants";
import * as authConstants from "../constants/authConstants";
import userServices from "../services/usersServices";

export const fetchUsers = async (dispatch, token) => {
    dispatch({ type: userConstants.FETCH_USERS_REQUEST });
    const data = await userServices.fetchUsers(token);
    if (!data) {
      return dispatch({
        type: userConstants.FETCH_USERS_FAILURE,
      });
    }

    if(data.status === 403) {
      return dispatch({
        type: authConstants.USER_LOGOUT,
      });
    }

    return dispatch({
      type: userConstants.FETCH_USERS_SUCCESS,
      payload: data,
    });

  };

  export const updateUser = async (dispatch, user, token) => {
    dispatch({ type: userConstants.UPDATE_USERS_REQUEST });
    const data = await userServices.updateUser(user, token);
    if (data.userId) {
      return dispatch({
        type: userConstants.UPDATE_USERS_SUCCESS,
        payload: data,
      });
    } else {
      return dispatch({
        type: userConstants.UPDATE_USERS_FAILURE,
        payload: data,
      });
    }
  };
  
  