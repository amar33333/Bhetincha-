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
  FETCH_USERS_FULFILLED,
  FETCH_USERS_REJECTED,
  FETCH_USERS_PENDING,
  PERMISSIONS_LIST_PENDING,
  PERMISSIONS_LIST_REJECTED,
  PERMISSIONS_LIST_FULFILLED,
  TOGGLE_PERMISSION_PENDING,
  TOGGLE_PERMISSION_FULFILLED,
  TOGGLE_PERMISSION_REJECTED,
  TOGGLE_GROUP_EDIT_MODAL,
  TOGGLE_USER_EDIT_MODAL,
  FETCH_USERS_NOT_PAGINATED_FULFILLED,
  FETCH_USERS_NOT_PAGINATED_REJECTED,
  FETCH_USERS_NOT_PAGINATED_PENDING,
  RESET_USER_GROUP_ERRORS
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: "",
  permissions_list: null,
  groups: [],
  users: [],
  usersFetchLoading: false,
  usersPages: 1,
  usersRowCount: 0,
  groupEditData: null,
  groupEditModal: false,
  userEditData: null,
  userEditModal: false,
  permissionsLoading: false,
  usersNotPaginatedList: [],
  userGroupErrors: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_USER_GROUP_ERRORS:
      return { ...state, userGroupErrors: null };

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
      return { ...state, loading: true, permissionsLoading: true };

    case PERMISSIONS_LIST_FULFILLED:
      return {
        ...state,
        loading: false,
        permissionsLoading: false,
        permissions_list: action.payload
      };

    case PERMISSIONS_LIST_REJECTED:
      return {
        ...state,
        loading: false,
        permissionsLoading: false,
        statusClass: "rejected"
      };

    case CREATE_GROUP_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case CREATE_GROUP_FULFILLED:
      return {
        ...state,
        ...action.payload.data,
        loading: false,
        statusClass: "fulfilled",
        userGroupErrors: null
      };

    case CREATE_GROUP_REJECTED:
      return {
        ...state,
        loading: false,
        statusClass: "rejected",
        userGroupErrors: action.payload
      };

    case CREATE_USER_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case CREATE_USER_FULFILLED:
      return {
        ...state,
        ...action.payload.data,
        loading: false,
        statusClass: "fulfilled",
        userGroupErrors: null
      };

    case CREATE_USER_REJECTED:
      return {
        ...state,
        loading: false,
        statusClass: "rejected",
        userGroupErrors: action.payload
      };

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

    case FETCH_USERS_PENDING:
      return { ...state, usersFetchLoading: true };

    case FETCH_USERS_FULFILLED:
      return {
        ...state,
        users: action.payload.data.map((user, i) => ({
          ...user,
          s_no: action.payload.rows * (action.payload.page - 1) + i + 1
        })),
        usersPages: action.payload.pages,
        rowCount: action.payload.rowCount,
        usersFetchLoading: false
      };

    case FETCH_USERS_REJECTED:
      return { ...state, usersFetchLoading: false };

    case FETCH_USERS_NOT_PAGINATED_PENDING:
      return { ...state, usersFetchLoading: true };

    case FETCH_USERS_NOT_PAGINATED_FULFILLED:
      return {
        ...state,
        usersNotPaginatedList: action.payload,
        usersFetchLoading: false
      };

    case FETCH_USERS_NOT_PAGINATED_REJECTED:
      return { ...state, usersFetchLoading: false };

    case TOGGLE_GROUP_EDIT_MODAL:
      return {
        ...state,
        groupEditModal: !state.groupEditModal,
        groupEditData: action.payload
      };

    case TOGGLE_USER_EDIT_MODAL:
      return {
        ...state,
        userEditModal: !state.userEditModal,
        userEditData: action.payload
      };
    default:
      return state;
  }
}
