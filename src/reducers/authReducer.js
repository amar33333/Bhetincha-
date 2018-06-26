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
  PERMISSIONS_LOAD_PENDING,
  PERMISSIONS_LOAD_FULFILLED,
  PERMISSIONS_LOAD_REJECTED,
  REQUEST_PHONE_VERIFICATION_FULFILLED,
  REQUEST_PHONE_VERIFICATION_PENDING,
  REQUEST_PHONE_VERIFICATION_REJECTED,
  TOGGLE_PHONE_VERIFICATION_MODAL,
  SEND_PHONE_VERIFICATION_TOKEN_FULFILLED,
  SEND_PHONE_VERIFICATION_TOKEN_PENDING,
  SEND_PHONE_VERIFICATION_TOKEN_REJECTED,
  LOGOUT_USER
} from "../actions/types";

import { stat } from "fs";

const INITIAL_STATE = {
  loading: false,
  error: false,
  cookies: null,
  permissions_loading: false,
  phone_verification_request: false,
  phone_verification_response: null,
  phoneVerificationModal: false,
  data: null,
  search_selected_business_id: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return { ...state, cookies: action.payload };

    case COOKIES_LOAD_FULFILLED:
      return { ...state, ...action.payload };

    case PERMISSIONS_LOAD_PENDING:
      return { ...state, ...action.payload, permissions_loading: true };

    case PERMISSIONS_LOAD_REJECTED:
      return { ...state, ...action.payload, permissions_loading: false };

    case PERMISSIONS_LOAD_FULFILLED:
      return { ...state, ...action.payload, permissions_loading: false };

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
      return { ...state, business_user: action.payload, loading: false };

    case CREATE_BUSINESS_USER_REJECTED:
      return { ...state, loading: false };

    case CREATE_INDIVIDUAL_USER_PENDING:
      return { ...state, loading: true };

    case CREATE_INDIVIDUAL_USER_FULFILLED:
      return { ...state, individual_user: action.payload, loading: false };

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

    case SEND_PHONE_VERIFICATION_TOKEN_PENDING:
      return { ...state, loading: true };

    case SEND_PHONE_VERIFICATION_TOKEN_FULFILLED:
      return {
        ...state,
        phone_verification_response: action.payload,
        loading: false
      };

    case SEND_PHONE_VERIFICATION_TOKEN_REJECTED:
      return { ...state, loading: false };

    case TOGGLE_PHONE_VERIFICATION_MODAL:
      console.log("togl phon: ", action.payload);
      return {
        ...state,
        phoneVerificationModal: !state.phoneVerificationModal,
        search_selected_business_id: action.payload
      };

    default:
      return state;
  }
}
