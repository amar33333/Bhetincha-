import {
  CREATE_GROUP_FULFILLED,
  CREATE_GROUP_REJECTED,
  CREATE_GROUP_PENDING,
  CREATE_USER_FULFILLED,
  CREATE_USER_REJECTED,
  CREATE_USER_PENDING,
  FETCH_GROUPS_FULFILLED,
  FETCH_GROUPS_REJECTED,
  FETCH_GROUPS_PENDING,
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  FETCH_USER_PENDING,
  PERMISSIONS_LIST_PENDING,
  PERMISSIONS_LIST_REJECTED,
  PERMISSIONS_LIST_FULFILLED,
  TOGGLE_PERMISSION_PENDING,
  TOGGLE_PERMISSION_FULFILLED,
  TOGGLE_PERMISSION_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: "",
  permissions_list: [],
  groups: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_PERMISSION_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case TOGGLE_PERMISSION_FULFILLED:
      return {
        ...state,
        loading: false
      };

    case TOGGLE_PERMISSION_REJECTED:
      return { ...state, loading: false };

    case PERMISSIONS_LIST_PENDING:
      return { ...state, loading: true };

    case PERMISSIONS_LIST_FULFILLED:
      return {
        ...state,
        permissions_list: action.payload
      };

    case PERMISSIONS_LIST_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

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

    case FETCH_GROUPS_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case FETCH_GROUPS_FULFILLED:
      return {
        ...state,
        groups: action.payload.map((group, i) => ({ ...group, s_no: i + 1 })),
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_GROUPS_REJECTED:
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
