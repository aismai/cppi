import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import questionReducer from "./questionReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profiles: profileReducer,
  questions: questionReducer
});
