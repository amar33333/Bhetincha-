import {
  CATEGORY_FILTER_ON_CHANGE,
  CLEAR_CATEGORY_ALL,
  FETCH_CATEGORY_FULFILLED,
  CATEGORY_SET_SORT_BY,
  UNMOUNT_CATEGORY
} from "../actions/types";

const INITIAL_STATE = {
  name: "",
  sortby: [],
  rows: 20,
  page: 1,
  filterIndustry: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CATEGORY_FULFILLED:
      return { ...state, page: action.payload.page, rows: action.payload.rows };

    case CATEGORY_FILTER_ON_CHANGE:
      return { ...state, ...action.payload };

    case CATEGORY_SET_SORT_BY:
      return { ...state, sortby: action.payload };

    case CLEAR_CATEGORY_ALL:
    case UNMOUNT_CATEGORY:
      return INITIAL_STATE;

    default:
      return state;
  }
}
