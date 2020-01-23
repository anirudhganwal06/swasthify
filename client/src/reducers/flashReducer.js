import { SET_FLASH } from "../types";

const initialState = {
  showFlash: false,
  flashMessage: ""
};

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_FLASH:
      return action.payload;
    default:
      return {...state};
  }
};