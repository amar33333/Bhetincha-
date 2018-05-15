import {
  CLEAR_CITY_NAME_SEARCH,
  CITY_FILTER_ON_CHANGE,
  CLEAR_CITY_FILTER,
  FETCH_CITY_FULFILLED,
  CITY_SET_SORT_BY
} from "../actions/types";

const INITIAL_STATE = {
  q: "",
  sort_by: [],
  city: "",
  rows: 20,
  page: 1
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CITY_FULFILLED:
      return { ...state, page: action.payload.page, rows: action.payload.rows };

    case CITY_FILTER_ON_CHANGE:
      return { ...state, ...action.payload };

    case CITY_SET_SORT_BY:
      return { ...state, sort_by: action.payload };

    case CLEAR_CITY_FILTER:
      return {
        ...INITIAL_STATE,
        q: state.q,
        rows: state.rows,
        page: state.page
      };

    case CLEAR_CITY_NAME_SEARCH:
      return { ...state, q: "" };

    default:
      return state;
  }
}
