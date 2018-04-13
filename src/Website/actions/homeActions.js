import { TOGGLE_LOGIN_MODAL, TOGGLE_REGISTER_MODAL } from "./types";

export const toggleLoginModal = show => ({
  type: TOGGLE_LOGIN_MODAL,
  payload: show
});

export const toggleRegisterModal = show => ({
  type: TOGGLE_REGISTER_MODAL,
  payload: show
});
