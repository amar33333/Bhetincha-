import { TOGGLE_LOGGEDIN } from "../actions/types";

const INITIAL_STATE = {
  loggedIn: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_LOGGEDIN:
      return { ...state, loggedIn: !state.loggedIn };
    default:
      return state;
  }
}
