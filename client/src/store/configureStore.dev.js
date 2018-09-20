import { createStore, applyMiddleware } from "redux";
import reduxImmutableStateInvariate from "redux-immutable-state-invariant"; // eslint-disable-line import/no-extraneous-dependencies
import thunk from "redux-thunk";
import rootReducer from "../reducers";

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, reduxImmutableStateInvariate())
  );
}
