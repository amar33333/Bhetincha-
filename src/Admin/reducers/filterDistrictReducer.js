import {
  DISTRICT_FILTER_ON_CHANGE,
  CLEAR_DISTRICT_ALL,
  FETCH_DISTRICT_FULFILLED,
  DISTRICT_SET_SORT_BY
} from "../actions/types";

const INITIAL_STATE = {
  name: "",
  sortby: [],
  rows: 20,
  page: 1,
  filterCountry: [],
  filterState: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_DISTRICT_FULFILLED:
      return { ...state, page: action.payload.page, rows: action.payload.rows };

    case DISTRICT_FILTER_ON_CHANGE:
      return { ...state, ...action.payload };

    case DISTRICT_SET_SORT_BY:
      return { ...state, sortby: action.payload };

    case CLEAR_DISTRICT_ALL:
      return INITIAL_STATE;

    default:
      return state;
  }
}
