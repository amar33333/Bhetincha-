import {
  CLEAR_APP_BUSINESS_NAME_SEARCH,
  APP_BUSINESS_FILTER_ON_CHANGE,
  CLEAR_APP_BUSINESS_FILTER,
  FETCH_APP_BUSINESS_FULFILLED,
  APP_BUSINESS_SET_SORT_BY
} from "../actions/types";

const INITIAL_STATE = {
  q: "",
  sort_by: [],
  industry: "",
  rows: 20,
  page: 1
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_APP_BUSINESS_FULFILLED:
      return { ...state, page: action.payload.page, rows: action.payload.rows };

    case APP_BUSINESS_FILTER_ON_CHANGE:
      return { ...state, ...action.payload };

    case APP_BUSINESS_SET_SORT_BY:
      return { ...state, sort_by: action.payload };

    case CLEAR_APP_BUSINESS_FILTER:
      return {
        ...INITIAL_STATE,
        q: state.q,
        rows: state.rows,
        page: state.page
      };

    case CLEAR_APP_BUSINESS_NAME_SEARCH:
      return { ...state, q: "" };

    default:
      return state;
  }
}
