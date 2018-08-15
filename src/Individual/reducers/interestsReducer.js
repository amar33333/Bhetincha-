import {
  ADD_SKILLS_FULFILLED,
  ADD_SKILLS_PENDING,
  ADD_SKILLS_REJECTED
} from "../actions/types";

const INITIAL_STATE = { loading: false };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_SKILLS_PENDING:
      return {
        ...state,
        loading: true
      };

    case ADD_SKILLS_FULFILLED:
      return {
        ...state,
        loading: false
      };

    case ADD_SKILLS_REJECTED:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
