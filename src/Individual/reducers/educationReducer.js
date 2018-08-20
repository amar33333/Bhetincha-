import {
  ADD_EDUCATION_FULFILLED,
  ADD_EDUCATION_PENDING,
  ADD_EDUCATION_REJECTED,
  FETCH_EDUCATION_FULFILLED,
  FETCH_EDUCATION_PENDING,
  FETCH_EDUCATION_REJECTED,
  FETCH_EDUCATION_EACH_FULFILLED,
  FETCH_EDUCATION_EACH_PENDING,
  FETCH_EDUCATION_EACH_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  educationDetailsLoading: false,
  educationDetailsEachLoading: false,
  educationDetails: [],
  educationEachDetail: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_EDUCATION_PENDING:
      return { ...state };
    case ADD_EDUCATION_REJECTED:
      return { ...state };
    case ADD_EDUCATION_FULFILLED:
      return {
        ...state
      };

    case FETCH_EDUCATION_PENDING:
      return { ...state, educationDetailsLoading: true };
    case FETCH_EDUCATION_REJECTED:
      return { ...state, educationDetailsLoading: false };
    case FETCH_EDUCATION_FULFILLED:
      return {
        ...state,
        educationDetailsLoading: false,
        educationDetails: action.payload
      };

    case FETCH_EDUCATION_EACH_PENDING:
      return { ...state, educationDetailsEachLoading: true };
    case FETCH_EDUCATION_EACH_REJECTED:
      return { ...state, educationDetailsEachLoading: false };
    case FETCH_EDUCATION_EACH_FULFILLED:
      return {
        ...state,
        educationDetailsEachLoading: false,
        educationEachDetail: action.payload
      };
    default:
      return state;
  }
}
