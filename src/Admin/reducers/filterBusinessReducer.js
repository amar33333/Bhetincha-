import {
  CLEAR_BUSINESS_NAME_SEARCH,
  BUSINESS_FILTER_ON_CHANGE,
  CLEAR_BUSINESS_FILTER,
  FETCH_BUSINESS_FULFILLED,
  BUSINESS_SET_SORT_BY
} from "../actions/types";

const INITIAL_STATE = {
  q: "",
  sort_by: [],
  filterIndustry: [],
  filterCategory: [],
  filterSubCategory: [],
  filterCountry: [],
  filterState: [],
  filterDistrict: [],
  filterCity: [],
  filterArea: [],
  rows: 20,
  page: 1
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_BUSINESS_FULFILLED:
      return { ...state, page: action.payload.page, rows: action.payload.rows };

    case BUSINESS_FILTER_ON_CHANGE:
      return { ...state, ...action.payload };

    case BUSINESS_SET_SORT_BY:
      return { ...state, sort_by: action.payload };

    case CLEAR_BUSINESS_FILTER:
      return {
        ...INITIAL_STATE,
        q: state.q,
        rows: state.rows,
        page: state.page
      };

    case CLEAR_BUSINESS_NAME_SEARCH:
      return { ...state, q: "" };

    default:
      return state;
  }
}
