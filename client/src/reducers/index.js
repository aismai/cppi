import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import questionReducer from "./questionReducer";
import personalDataReducer from "./personalDataReducer";
import surveyReducer from "./surveyReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profiles: profileReducer,
  questions: questionReducer,
  personalData: personalDataReducer,
  surveys: surveyReducer
});
