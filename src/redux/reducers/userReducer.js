import * as types from "../constants";

const initialState = {
  user: {}
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.SET_CURRENT_USER:
      return {
        ...state,
        user: actions.payload
      };
    default:
      return state;
  }
}
