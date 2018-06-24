import {
  CITY_FILTER_ON_CHANGE,
  CLEAR_CITY_ALL,
  FETCH_CITY_FULFILLED,
  CITY_SET_SORT_BY,
  UNMOUNT_CITY
} from "../actions/types";

const INITIAL_STATE = {
  name: "",
  sortby: [],
  rows: 20,
  page: 1,
  filterDistrict: [],
  filterState: [],
  filterCountry: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CITY_FULFILLED:
      return { ...state, page: action.payload.page, rows: action.payload.rows };

    case CITY_FILTER_ON_CHANGE:
      return { ...state, ...action.payload };

    case CITY_SET_SORT_BY:
      return { ...state, sortby: action.payload };

    case CLEAR_CITY_ALL:
    case UNMOUNT_CITY:
      return INITIAL_STATE;

    default:
      return state;
  }
}
