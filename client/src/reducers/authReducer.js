import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authReducer(state = initialState.auth, action) {
  if (
    action.type === types.SIGNUP_SUCCESS ||
    action.type === types.SIGNIN_SUCCESS
  ) {
    const { auth } = action;
    return Object.assign({}, state, auth);
  }
  if (
    action.type === types.SIGNUP_FAILURE ||
    action.type === types.SIGNIN_FAILURE
  ) {
    const { errorMessage } = action;
    return { errorMessage };
  }
  if (action.type === types.SIGNOUT_SUCCESS) {
    return initialState.auth;
  }
  return state;
}
