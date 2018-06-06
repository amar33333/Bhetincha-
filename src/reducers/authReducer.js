import {
  FETCH_USER_PENDING,
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  CREATE_BUSINESS_USER_FULFILLED,
  CREATE_BUSINESS_USER_REJECTED,
  CREATE_BUSINESS_USER_PENDING,
  CREATE_INDIVIDUAL_USER_FULFILLED,
  CREATE_INDIVIDUAL_USER_REJECTED,
  CREATE_INDIVIDUAL_USER_PENDING,
  COOKIES_LOAD_FULFILLED,
  LOGOUT_USER
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  error: false,
  cookies: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return { ...state, cookies: action.payload };

    case COOKIES_LOAD_FULFILLED:
      return { ...state, ...action.payload };

    case FETCH_USER_PENDING:
      return { ...state, loading: true };

    case FETCH_USER_FULFILLED:
      console.log("user: ", action.payload);
      return { ...state, ...action.payload, loading: false, error: false };

    case FETCH_USER_REJECTED:
      return { ...state, loading: false, error: true };

    case CREATE_BUSINESS_USER_PENDING:
      return { ...state, loading: true };

    case CREATE_BUSINESS_USER_FULFILLED:
      return { ...state, data: action.payload, loading: false };

    case CREATE_BUSINESS_USER_REJECTED:
      return { ...state, loading: false };

    case CREATE_INDIVIDUAL_USER_PENDING:
      return { ...state, loading: true };

    case CREATE_INDIVIDUAL_USER_FULFILLED:
      return { ...state, data: action.payload, loading: false };

    case CREATE_INDIVIDUAL_USER_REJECTED:
      return { ...state, loading: false };

    default:
      return state;
  }
}
