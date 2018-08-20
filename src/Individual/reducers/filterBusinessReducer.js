import {
  BUSINESS_FILTER_ON_CHANGE,
  FETCH_BUSINESS_FULFILLED
} from "../actions/types";

const INITIAL_STATE = {
  q: "",
  rows: 25,
  page: 1
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_BUSINESS_FULFILLED:
      return { ...state, page: action.payload.page, rows: action.payload.rows };

    case BUSINESS_FILTER_ON_CHANGE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
