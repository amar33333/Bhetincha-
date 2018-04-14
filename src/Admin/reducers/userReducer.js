import {
  CREATE_GROUP_FULFILLED,
  CREATE_GROUP_REJECTED,
  CREATE_GROUP_PENDING,
  CREATE_USER_FULFILLED,
  CREATE_USER_REJECTED,
  CREATE_USER_PENDING,
  FETCH_GROUP_FULFILLED,
  FETCH_GROUP_REJECTED,
  FETCH_GROUP_PENDING,
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  FETCH_USER_PENDING
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_GROUP_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case CREATE_GROUP_FULFILLED:
      return {
        ...state,
        ...action.payload.data,
        loading: false,
        statusClass: "fulfilled"
      };

    case CREATE_GROUP_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

    case CREATE_USER_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case CREATE_USER_FULFILLED:
      return {
        ...state,
        ...action.payload.data,
        loading: false,
        statusClass: "fulfilled"
      };

    case CREATE_USER_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

    case FETCH_GROUP_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case FETCH_GROUP_FULFILLED:
      return {
        ...state,
        groups: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_GROUP_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

    case FETCH_USER_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case FETCH_USER_FULFILLED:
      return {
        ...state,
        users: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_USER_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

    default:
      return state;
  }
}
