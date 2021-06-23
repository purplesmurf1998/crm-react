import * as types from "../constants";

export function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    payload: user
  };
}
