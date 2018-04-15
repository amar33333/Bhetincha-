import { TOGGLE_EDIT } from "../actions/types";

const INITIAL_STATE = {
  edit: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_EDIT:
      return { ...state, edit: !state.edit };
    default:
      return state;
  }
}
