import {
  FETCH_USER_PENDING,
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  CREATE_USER_PENDING,
  CREATE_USER_FULFILLED,
  CREATE_USER_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case FETCH_USER_FULFILLED:
      return { ...state, loading: false, statusClass: "fulfilled" };

    case FETCH_USER_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

    case CREATE_USER_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case CREATE_USER_FULFILLED:
      console.log("fulfflled");
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        statusClass: "fulfilled"
      };

    case CREATE_USER_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

    default:
      return state;
  }
}
