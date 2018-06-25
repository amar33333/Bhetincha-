import {
  USERS_FILTER_ON_CHANGE,
  FETCH_USERS_FULFILLED,
  USERS_SET_SORT_BY
} from "../actions/types";

const INITIAL_STATE = {
  username: "",
  first_name: "",
  last_name: "",
  rows: 20,
  page: 1,
  filterGroup: [],
  sortby: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USERS_FULFILLED:
      return { ...state, page: action.payload.page, rows: action.payload.rows };

    case USERS_FILTER_ON_CHANGE:
      return { ...state, ...action.payload };

    case USERS_SET_SORT_BY:
      return { ...state, sortby: action.payload };

    // case CLEAR_USERS_ALL:
    //   return INITIAL_STATE;

    default:
      return state;
  }
}
