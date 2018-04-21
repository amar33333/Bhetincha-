import { TOGGLE_LOGIN_MODAL, TOGGLE_REGISTER_MODAL } from "../actions/types";

const INITIAL_STATE = {
  loginModal: false,
  registerModal: false,

  // test
  isPinging: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_LOGIN_MODAL:
      return { ...state, loginModal: !state.loginModal };

    case TOGGLE_REGISTER_MODAL:
      return { ...state, registerModal: !state.registerModal };

    case "PING":
      return { ...state, isPinging: true };

    case "PONG":
      return { ...state, isPinging: false };

    default:
      return state;
  }
}
