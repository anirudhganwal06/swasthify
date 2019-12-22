import { combineReducers } from "redux";

import authReducer from "./authReducer";
import otpReducer from "./otpReducer";

export default combineReducers({
  auth: authReducer,
  otp: otpReducer
});
