import {
  STATE_FILTER_ON_CHANGE,
  CLEAR_STATE_ALL,
  FETCH_STATE_FULFILLED,
  STATE_SET_SORT_BY
} from "../actions/types";

const INITIAL_STATE = {
  name: "",
  sortby: [],
  rows: 20,
  page: 1,
  filterCountry: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_STATE_FULFILLED:
      return { ...state, page: action.payload.page, rows: action.payload.rows };

    case STATE_FILTER_ON_CHANGE:
      return { ...state, ...action.payload };

    case STATE_SET_SORT_BY:
      return { ...state, sortby: action.payload };

    case CLEAR_STATE_ALL:
      return INITIAL_STATE;

    default:
      return state;
  }
}
