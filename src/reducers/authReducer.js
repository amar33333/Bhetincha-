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
  REQUEST_PHONE_VERIFICATION_FULFILLED,
  REQUEST_PHONE_VERIFICATION_PENDING,
  REQUEST_PHONE_VERIFICATION_REJECTED,
  LOGOUT_USER
} from "../actions/types";

import { TOGGLE_PHONE_VERIFICATION_MODAL } from "../Website/actions/types";
import { stat } from "fs";

const INITIAL_STATE = {
  loading: false,
  error: false,
  cookies: null,
  phone_verification_request: false,
  phoneVerificationModal: false
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

    case REQUEST_PHONE_VERIFICATION_PENDING:
      return { ...state, loading: true };

    case REQUEST_PHONE_VERIFICATION_FULFILLED:
      return {
        ...state,
        phone_verification_request: action.payload,
        loading: false
      };

    case REQUEST_PHONE_VERIFICATION_REJECTED:
      return { ...state, loading: false };

    case TOGGLE_PHONE_VERIFICATION_MODAL:
      return {
        ...state,
        phoneVerificationModal: !state.phoneVerificationModal,
        phone_verification_request: false
      };

    default:
      return state;
  }
}
