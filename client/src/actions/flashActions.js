import { SET_FLASH } from "../types";

export const setFlashMessage = (showFlash, flashMessage, flashTimeout) => ({
  type: SET_FLASH,
  payload: {
    showFlash,
    flashMessage,
    flashTimeout
  }
});
