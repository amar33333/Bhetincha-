import {
  FETCH_SUB_CATEGORY_FULFILLED,
  FETCH_SUB_CATEGORY_REJECTED,
  FETCH_SUB_CATEGORY_PENDING
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SUB_CATEGORY_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case FETCH_SUB_CATEGORY_FULFILLED:
      return {
        ...state,
        data: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_SUB_CATEGORY_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

    default:
      return state;
  }
}
