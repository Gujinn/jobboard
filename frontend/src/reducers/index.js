import { combineReducers } from "redux";
import authReducer from "./authReducers";
import jobReducer from "./jobReducers";
import errorReducer from "./errorReducers";
import applyReducer from "./applyReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  job: jobReducer,
  apply: applyReducer
});