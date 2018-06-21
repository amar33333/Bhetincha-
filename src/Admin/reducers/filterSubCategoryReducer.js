import {
  SUB_CATEGORY_FILTER_ON_CHANGE,
  CLEAR_SUB_CATEGORY_ALL,
  FETCH_SUB_CATEGORY_FULFILLED,
  SUB_CATEGORY_SET_SORT_BY
} from "../actions/types";

const INITIAL_STATE = {
  name: "",
  sortby: [],
  rows: 20,
  page: 1,
  filterIndustry: [],
  filterCategory: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SUB_CATEGORY_FULFILLED:
      return { ...state, page: action.payload.page, rows: action.payload.rows };

    case SUB_CATEGORY_FILTER_ON_CHANGE:
      return { ...state, ...action.payload };

    case SUB_CATEGORY_SET_SORT_BY:
      return { ...state, sortby: action.payload };

    case CLEAR_SUB_CATEGORY_ALL:
      return INITIAL_STATE;

    default:
      return state;
  }
}
