import { TOGGLE_EDIT_MAIN, TOGGLE_EDIT_ABOUT_US } from "../actions/types";

const INITIAL_STATE = {
  main: false,
  aboutUs: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_EDIT_MAIN:
      return { ...state, main: !state.main };
    case TOGGLE_EDIT_ABOUT_US:
      return { ...state, aboutUs: !state.aboutUs };
    default:
      return state;
  }
}
