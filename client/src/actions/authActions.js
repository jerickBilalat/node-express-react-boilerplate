import axios from "axios";
import * as types from "./actionTypes";
import { beginAjaxCall, ajaxCallError } from "./ajaxActions";

export function signupSuccess(userCredentials) {
  return { type: types.SIGNUP_SUCCESS, userCredentials };
}

export function signupFailure(errorMessage) {
  return { type: types.SIGNUP_FAILURE, errorMessage };
}

export function signinSuccess(userCredentials) {
  return { type: types.SIGNIN_SUCCESS, userCredentials };
}

export function signinFailure(errorMessage) {
  return { type: types.SIGNIN_FAILURE, errorMessage };
}

export function signsoutSuccess() {
  return { type: types.SIGNOUT_SUCCESS };
}

export const signup = credentials => dispatch => {
  dispatch(beginAjaxCall());
  return axios
    .post("http://localhost:9000/signup", credentials)
    .then(res => {
      if (res.data.errorMessage) {
        dispatch(signupFailure(res.data.errorMessage));
      }
      localStorage.setItem("token", res.data.token);
      dispatch(signupSuccess(res.data.userCredentials));
    })
    .catch(error => {
      dispatch(ajaxCallError());
      throw error;
    });
};

export const signin = credentials => dispatch => {
  dispatch(beginAjaxCall());
  return axios
    .post("http://localhost:9000/signin", credentials)
    .then(res => {
      if (res.data.errorMessage) {
        dispatch(signupFailure(res.data.errorMessage));
      }
      localStorage.setItem("token", res.data.token);
      dispatch(signupSuccess(res.data.userCredentials));
    })
    .catch(error => {
      dispatch(ajaxCallError());
      throw error;
    });
};

export const signout = () => {
  localStorage.removeItem("token");
  return signsoutSuccess();
};
