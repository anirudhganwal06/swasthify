import { OTP_SENT } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (state.type) {
    case OTP_SENT:
      return { otpSent: true };
    default:
      return state;
  }
};
