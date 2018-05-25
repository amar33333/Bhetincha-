import {
  AREA_FILTER_ON_CHANGE,
  CLEAR_AREA_ALL,
  FETCH_AREA_FULFILLED,
  AREA_SET_SORT_BY
} from "../actions/types";

const INITIAL_STATE = {
  name: "",
  sortby: [],
  rows: 20,
  page: 1,
  filterCity: [],
  filterDistrict: [],
  filterState: [],
  filterCountry: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_AREA_FULFILLED:
      return { ...state, page: action.payload.page, rows: action.payload.rows };

    case AREA_FILTER_ON_CHANGE:
      return { ...state, ...action.payload };

    case AREA_SET_SORT_BY:
      return { ...state, sortby: action.payload };

    case CLEAR_AREA_ALL:
      return INITIAL_STATE;

    default:
      return state;
  }
}
