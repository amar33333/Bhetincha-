import {
  CLEAR_ASSIGN_BUSINESS_NAME_SEARCH,
  ASSIGN_BUSINESS_FILTER_ON_CHANGE,
  CLEAR_ASSIGN_BUSINESS_FILTER,
  FETCH_ASSIGN_BUSINESS_FULFILLED,
  ASSIGN_BUSINESS_SET_SORT_BY
} from "../actions/types";

const INITIAL_STATE = {
  q: "",
  sort_by: [],
  industry: [],
  area: null,
  rows: 20,
  page: 1
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ASSIGN_BUSINESS_FULFILLED:
      return { ...state, page: action.payload.page, rows: action.payload.rows };

    case ASSIGN_BUSINESS_FILTER_ON_CHANGE:
      return { ...state, ...action.payload };

    case ASSIGN_BUSINESS_SET_SORT_BY:
      return { ...state, sort_by: action.payload };

    case CLEAR_ASSIGN_BUSINESS_FILTER:
      return {
        ...INITIAL_STATE,
        q: state.q,
        rows: state.rows,
        page: state.page
      };

    case CLEAR_ASSIGN_BUSINESS_NAME_SEARCH:
      return { ...state, q: "" };

    default:
      return state;
  }
}
