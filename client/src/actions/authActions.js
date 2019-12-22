import axios from "axios";

import { GET_ERRORS, OTP_SENT } from "./types";

export const sendOtp = (userData, history) => async dispatch => {
  try {
    await axios.post("/api/send-otp", userData);
    dispatch({
      type: OTP_SENT
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

export const signupUser = (userData, history) => async dispatch => {
  try {
    await axios.post("/api/signup", userData);
    history.push("/login");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};
