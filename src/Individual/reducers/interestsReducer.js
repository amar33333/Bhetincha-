import {
  ADD_SKILLS_FULFILLED,
  ADD_SKILLS_PENDING,
  ADD_SKILLS_REJECTED,
  FETCH_SKILLS_FULFILLED,
  FETCH_SKILLS_PENDING,
  FETCH_SKILLS_REJECTED
} from "../actions/types";

const INITIAL_STATE = { loading: false, skillsLoading: false, skills: [] };

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

    case FETCH_SKILLS_PENDING:
      return {
        ...state,
        skillsLoading: true,
        loading: true
      };

    case FETCH_SKILLS_FULFILLED:
      return {
        ...state,
        skillsLoading: false,
        ...action.payload,
        loading: false
      };

    case FETCH_SKILLS_REJECTED:
      return {
        ...state,
        skillsLoading: false,
        loading: false
      };

    default:
      return state;
  }
}
