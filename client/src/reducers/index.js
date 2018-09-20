import { combineReducers } from "redux";
import eventReducer from "./eventReducer";
import ajaxReducer from "./ajaxReducer";

const rootReducer = combineReducers({
  eventReducer,
  ajaxReducer
});

export default rootReducer;
