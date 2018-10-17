import axios from "axios";
import * as types from "./actionTypes";
import { beginAjaxCall, ajaxCallError } from "./ajaxActions";

// axios.interceptors.response.use(
//   response => response,
//   error => {
//     const { status } = error.response;
//     if (status === 401) {
//       dispatch(signupFailure());
//     }
//     return Promise.reject(error);
//   }
// );

export function signupSuccess(auth) {
  return { type: types.SIGNUP_SUCCESS, auth };
}

export function signupFailure(errorMessage) {
  return { type: types.SIGNUP_FAILURE, errorMessage };
}

export function signinSuccess(auth) {
  return { type: types.SIGNIN_SUCCESS, auth };
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
      localStorage.setItem("token", res.data.token);
      return dispatch(signupSuccess(res.data));
    })
    .catch(error => {
      dispatch(signupFailure(error.response.data.errorMessage));
      dispatch(ajaxCallError());
    });
};

export const signin = credentials => dispatch => {
  dispatch(beginAjaxCall());
  return axios
    .post("http://localhost:9000/signin", credentials)
    .then(res => {
      if (res.data.errorMessage) {
        dispatch(signinFailure(res.data.errorMessage));
      }
      localStorage.setItem("token", res.data.token);
      dispatch(signinSuccess(res.data));
    })
    .catch(error => {
      dispatch(signinFailure(error.response.data.errorMessage));
      dispatch(ajaxCallError());
      throw error;
    });
};

export const signout = () => {
  localStorage.removeItem("token");
  return signsoutSuccess();
};
