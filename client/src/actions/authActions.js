import axios from "axios";

import { GET_ERRORS } from "./types";

export const signupUser = async (userData, history) => dispatch => {
  try {
    const res = await axios.post("/api/signup");
    history.push("/login");
  } catch (err) {
      dispatch({
          type: GET_ERRORS,
          payload: err
      });
  }
};
