import * as userConstants from "../constants/usersConstants";

const usersInitialState = {
  loading: false,
  error: null,
  users: [],
};

export const usersReducer = (state = usersInitialState, action) => {
  switch (action.type) {
    case userConstants.FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case userConstants.FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case userConstants.FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};