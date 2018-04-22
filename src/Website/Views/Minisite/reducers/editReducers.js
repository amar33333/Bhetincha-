import {
  TOGGLE_EDIT_MAIN,
  TOGGLE_EDIT_ABOUT_US,
  UPDATE_ABOUT_PENDING,
  UPDATE_ABOUT_FULFILLED,
  UPDATE_ABOUT_REJECTED,
  FETCH_BUSINESS_PENDING,
  FETCH_BUSINESS_FULFILLED,
  FETCH_BUSINESS_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  main: false,
  mainLoading: true,
  aboutUs: false,
  aboutUsLoading: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_EDIT_MAIN:
      return { ...state, main: !state.main };
    case TOGGLE_EDIT_ABOUT_US:
      return { ...state, aboutUs: !state.aboutUs };
    case UPDATE_ABOUT_PENDING:
      return { ...state, aboutUsLoading: true };
    case UPDATE_ABOUT_FULFILLED:
    case UPDATE_ABOUT_REJECTED:
      return { ...state, aboutUsLoading: false };
    case FETCH_BUSINESS_PENDING:
      return { ...state, mainLoading: true };
    case FETCH_BUSINESS_FULFILLED:
    case FETCH_BUSINESS_REJECTED:
      return { ...state, mainLoading: false };
    default:
      return state;
  }
}
