import { TOGGLE_LOGIN_MODAL, TOGGLE_REGISTER_MODAL } from "./types";

export const toggleLoginModal = () => ({
  type: TOGGLE_LOGIN_MODAL
});

export const toggleRegisterModal = () => ({
  type: TOGGLE_REGISTER_MODAL
});

// test
export const ping = () => ({ type: "PING" });
