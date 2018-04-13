import { TOGGLE_LOGIN_MODAL, TOGGLE_REGISTER_MODAL } from "../actions/types";

const INITIAL_STATE = {
  loginModal: false,
  registerModal: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_LOGIN_MODAL:
      return { ...state, loginModal: action.payload };

    case TOGGLE_REGISTER_MODAL:
      return { ...state, registerModal: action.payload };

    default:
      return state;
  }
}
