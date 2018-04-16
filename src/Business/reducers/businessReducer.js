import {
  FETCH_BUSINESS_FULFILLED,
  FETCH_BUSINESS_PENDING,
  FETCH_BUSINESS_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_BUSINESS_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case FETCH_BUSINESS_FULFILLED:
      return {
        ...state,
        data: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_BUSINESS_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

    default:
      return state;
  }
}
