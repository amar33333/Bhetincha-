import {
  FETCH_USER_PENDING,
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  CREATE_USER_PENDING,
  CREATE_USER_FULFILLED,
  CREATE_USER_REJECTED,
  TOGGLE_LOGIN_MODAL,
  TOGGLE_REGISTER_MODAL,
  COOKIES_LOAD_FULFILLED,
  LOGOUT_USER
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: "",
  loginModal: false,
  registerModal: false,
  error: false,
  cookies: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return { ...state, cookies: action.payload };

    case COOKIES_LOAD_FULFILLED:
      return { ...state, ...action.payload };

    case TOGGLE_LOGIN_MODAL:
      return { ...state, loginModal: action.payload };

    case TOGGLE_REGISTER_MODAL:
      return { ...state, registerModal: action.payload };

    case FETCH_USER_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case FETCH_USER_FULFILLED:
      return {
        ...state,
        ...action.payload,
        loading: false,
        statusClass: "fulfilled",
        loginModal: false,
        registerModal: false,
        error: false
      };

    case FETCH_USER_REJECTED:
      return {
        ...state,
        loading: false,
        statusClass: "rejected",
        // loginModal: false,
        registerModal: false,
        error: true
      };

    case CREATE_USER_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case CREATE_USER_FULFILLED:
      console.log("fulfflled");
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        statusClass: "fulfilled",
        loginModal: false,
        registerModal: false
      };

    case CREATE_USER_REJECTED:
      return {
        ...state,
        loading: false,
        statusClass: "rejected",
        loginModal: false,
        registerModal: false
      };

    default:
      return state;
  }
}
