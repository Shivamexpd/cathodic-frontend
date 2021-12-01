import { GET_USER, USER_TOKEN } from "../constants/userConstants";

const userReducer = (state = { user: {}, token: null }, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        user: action.payload,
        token: null,
      };
    case USER_TOKEN:
      return {
        user: {},
        token: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
