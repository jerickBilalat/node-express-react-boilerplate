import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authReducer(state = initialState.auth, action) {
  if (action.type === types.SIGNUP_SUCCESS || types.SIGNIN_SUCCESS) {
    const { userCredentials } = action;
    return { ...state, userCredentials };
  }
  if (
    action.type === types.SIGNUP_FAILURE ||
    action.type === types.SIGNIN_FAILURE
  ) {
    const { errorMessage } = action;
    return { ...state, errorMessage };
  }
  if (action.type === types.SIGNOUT_SUCCESS) {
    return initialState.auth;
  }
  return state;
}
