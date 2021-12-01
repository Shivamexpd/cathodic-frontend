import { GET_USER, USER_TOKEN } from "../constants/userConstants";

export const userAction = (data) => {
  return {
    type: GET_USER,
    payload: data,
  };
};
export const getUserToken = (data) => {
  return {
    type: USER_TOKEN,
    payload: data,
  };
};
