import {
  TOGGLE_LOGIN_MODAL,
  TOGGLE_REGISTER_MODAL,
  TOGGLE_PHONE_VERIFICATION_MODAL
} from "./types";

export const toggleLoginModal = () => ({
  type: TOGGLE_LOGIN_MODAL
});

export const togglePhoneVerificationModal = () => ({
  type: TOGGLE_PHONE_VERIFICATION_MODAL
});

export const toggleRegisterModal = () => ({
  type: TOGGLE_REGISTER_MODAL
});
