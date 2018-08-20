import {
  FETCH_BUSINESS_FULFILLED,
  FETCH_BUSINESS_PENDING,
  FETCH_BUSINESS_REJECTED,
  FETCH_INDUSTRY_FULFILLED,
  FETCH_INDUSTRY_PENDING,
  FETCH_INDUSTRY_REJECTED,
  ADD_EXPERIENCE_FULFILLED,
  ADD_EXPERIENCE_PENDING,
  ADD_EXPERIENCE_REJECTED,
  FETCH_EXPERIENCE_FULFILLED,
  FETCH_EXPERIENCE_PENDING,
  FETCH_EXPERIENCE_REJECTED,
  FETCH_EXPERIENCE_EACH_FULFILLED,
  FETCH_EXPERIENCE_EACH_PENDING,
  FETCH_EXPERIENCE_EACH_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  businesses: [],
  pages: 1,
  fetchLoading: false,
  rowCount: 0,
  industries: [],
  industryLoading: false,
  experienceDetailsLoading: false,
  experienceDetailsEachLoading: false,
  experienceDetails: [],
  experienceEachDetail: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_BUSINESS_PENDING:
      return { ...state, fetchLoading: true };
    case FETCH_BUSINESS_REJECTED:
      return { ...state, fetchLoading: false };
    case FETCH_BUSINESS_FULFILLED:
      return {
        ...state,
        fetchLoading: false,
        businesses: action.payload.data,
        pages: action.payload.pages,
        rowCount: action.payload.rowCount
      };

    case FETCH_INDUSTRY_PENDING:
      return { ...state, industryLoading: true };
    case FETCH_INDUSTRY_REJECTED:
      return { ...state, industryLoading: false };
    case FETCH_INDUSTRY_FULFILLED:
      return {
        ...state,
        industryLoading: false,
        industries: action.payload
      };

    case ADD_EXPERIENCE_PENDING:
      return { ...state };
    case ADD_EXPERIENCE_REJECTED:
      return { ...state };
    case ADD_EXPERIENCE_FULFILLED:
      return {
        ...state
      };

    case FETCH_EXPERIENCE_PENDING:
      return { ...state, experienceDetailsLoading: true };
    case FETCH_EXPERIENCE_REJECTED:
      return { ...state, experienceDetailsLoading: false };
    case FETCH_EXPERIENCE_FULFILLED:
      return {
        ...state,
        experienceDetailsLoading: false,
        experienceDetails: action.payload
      };

    case FETCH_EXPERIENCE_EACH_PENDING:
      return { ...state, experienceDetailsEachLoading: true };
    case FETCH_EXPERIENCE_EACH_REJECTED:
      return { ...state, experienceDetailsEachLoading: false };
    case FETCH_EXPERIENCE_EACH_FULFILLED:
      return {
        ...state,
        experienceDetailsEachLoading: false,
        experienceEachDetail: action.payload
      };

    default:
      return state;
  }
}
