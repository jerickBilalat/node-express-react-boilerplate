export default {
  events: [],
  ajaxCallsInProgress: 0,
  auth: {
    userCredentials: {},
    errorMessage: "",
    token: localStorage.getItem("token")
  }
};
