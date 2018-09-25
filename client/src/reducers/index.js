import { combineReducers } from "redux";
import eventReducer from "./eventReducer";
import ajaxReducer from "./ajaxReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  eventReducer,
  ajaxReducer,
  authReducer
});

export default rootReducer;
