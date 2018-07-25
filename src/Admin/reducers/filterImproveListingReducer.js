import {
  IMPROVE_LISTING_FILTER_ON_CHANGE,
  FETCH_IMPROVE_LISTING_FULFILLED,
  IMPROVE_LISTING_SET_SORT_BY
} from "../actions/types";

const INITIAL_STATE = {
  business: "",
  email: "",
  name: "",
  sortby: [],
  rows: 20,
  page: 1,
  filterProblem: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_IMPROVE_LISTING_FULFILLED:
      return { ...state, page: action.payload.page, rows: action.payload.rows };

    case IMPROVE_LISTING_FILTER_ON_CHANGE:
      return { ...state, ...action.payload };

    case IMPROVE_LISTING_SET_SORT_BY:
      return { ...state, sortby: action.payload };

    default:
      return state;
  }
}
