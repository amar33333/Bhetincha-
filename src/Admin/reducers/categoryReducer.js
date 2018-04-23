import {
  FETCH_CATEGORY_FULFILLED,
  FETCH_CATEGORY_PENDING,
  FETCH_CATEGORY_REJECTED,
  FETCH_CATEGORY_EACH_FULFILLED,
  FETCH_CATEGORY_EACH_REJECTED,
  FETCH_CATEGORY_EACH_PENDING,
  UNMOUNT_CATEGORY
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UNMOUNT_CATEGORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };
    case FETCH_CATEGORY_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case FETCH_CATEGORY_FULFILLED:
      return {
        ...state,
        data: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_CATEGORY_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

    case FETCH_CATEGORY_EACH_PENDING:
      return { ...state, loading: true };

    case FETCH_CATEGORY_EACH_FULFILLED:
      console.log("category reducer: ", action);
      return {
        ...state,
        categoryData: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_CATEGORY_EACH_REJECTED:
      return { ...state, loading: false };

    default:
      return state;
  }
}
