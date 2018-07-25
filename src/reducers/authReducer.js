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
  CHECK_REGISTRATION_FULFILLED,
  CHECK_REGISTRATION_PENDING,
  CHECK_REGISTRATION_REJECTED,
  FACEBOOK_LOGIN_FULFILLED,
  FACEBOOK_LOGIN_PENDING,
  FACEBOOK_LOGIN_REJECTED,
  GOOGLE_LOGIN_FULFILLED,
  GOOGLE_LOGIN_PENDING,
  GOOGLE_LOGIN_REJECTED,
  CHECK_USER_ACTIVATED_PENDING,
  CHECK_USER_ACTIVATED_FULFILLED,
  CHECK_USER_ACTIVATED_REJECTED,
  RESET_PHONE_VERIFICATION_REQUEST_ERROR,
  CREATE_USER_FULFILLED,
  CREATE_USER_REJECTED,
  CREATE_USER_PENDING,
  INDIVIDUAL_TOKEN_FULFILLED,
  INDIVIDUAL_TOKEN_PENDING,
  INDIVIDUAL_TOKEN_REJECTED,
  RESET_AUTH_ERRORS,
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
  search_selected_business_id: null,
  checkRegistrationData: null,
  phone_verification_request_error: null,
  facebookLogin: null,
  googleLogin: null,
  registerErrors: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_AUTH_ERRORS:
      return { ...state, registerErrors: null };

    case LOGOUT_USER:
      return { ...state, cookies: null };

    case COOKIES_LOAD_FULFILLED:
      return { ...state, ...action.payload };

    case PERMISSIONS_LOAD_PENDING:
      return { ...state, ...action.payload, permissions_loading: true };

    case PERMISSIONS_LOAD_REJECTED:
      return { ...state, ...action.payload, permissions_loading: false };

    case PERMISSIONS_LOAD_FULFILLED:
      return { ...state, ...action.payload, permissions_loading: false };

    case FACEBOOK_LOGIN_PENDING:
      return { ...state, ...action.payload };

    case FACEBOOK_LOGIN_REJECTED:
      return { ...state, ...action.payload };

    case FACEBOOK_LOGIN_FULFILLED:
      return { ...state, ...action.payload, facebookLogin: action.response };

    case FETCH_USER_PENDING:
      return { ...state, loading: true };

    case FETCH_USER_FULFILLED:
      return { ...state, ...action.payload, loading: false, error: false };

    case FETCH_USER_REJECTED:
      return { ...state, loading: false, error: true };

    case CHECK_USER_ACTIVATED_PENDING:
      return { ...state, loading: true };

    case CHECK_USER_ACTIVATED_FULFILLED:
      return { ...state, loading: false, error: false };

    case CHECK_USER_ACTIVATED_REJECTED:
      return { ...state, loading: false, error: true };

    case CREATE_BUSINESS_USER_PENDING:
      return { ...state, loading: true };

    case CREATE_BUSINESS_USER_FULFILLED:
      return {
        ...state,
        business_user: action.payload,
        loading: false,
        registerErrors: null
      };

    case CREATE_BUSINESS_USER_REJECTED:
      return { ...state, loading: false, registerErrors: action.payload };

    case INDIVIDUAL_TOKEN_PENDING:
      return { ...state, loading: true };

    case INDIVIDUAL_TOKEN_FULFILLED:
      return {
        ...state,
        loading: false,
        registerErrors: null
      };

    case INDIVIDUAL_TOKEN_REJECTED:
      return { ...state, loading: false, registerErrors: action.payload };

    case CREATE_USER_PENDING:
      return { ...state, loading: true };

    case CREATE_USER_FULFILLED:
      return {
        ...state,
        loading: false,
        registerErrors: null
      };

    case CREATE_USER_REJECTED:
      return {
        ...state,
        loading: false,
        registerErrors: action.payload
      };

    case CREATE_INDIVIDUAL_USER_PENDING:
      return { ...state, loading: true };

    case CREATE_INDIVIDUAL_USER_FULFILLED:
      return {
        ...state,
        individual_user: action.payload,
        loading: false,
        registerErrors: null
      };

    case CREATE_INDIVIDUAL_USER_REJECTED:
      return { ...state, loading: false, registerErrors: action.payload };

    case REQUEST_PHONE_VERIFICATION_PENDING:
      return { ...state, loading: true };

    case REQUEST_PHONE_VERIFICATION_FULFILLED:
      return {
        ...state,
        phone_verification_request: action.payload,
        loading: false
      };

    case REQUEST_PHONE_VERIFICATION_REJECTED:
      return {
        ...state,
        loading: false,
        phone_verification_request_error: action.payload
      };

    case RESET_PHONE_VERIFICATION_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        phone_verification_request_error: null
      };

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

    case CHECK_REGISTRATION_PENDING:
      return { ...state, loading: true };

    case CHECK_REGISTRATION_FULFILLED:
      return {
        ...state,
        checkRegistrationData: action.payload,
        loading: false
      };

    case CHECK_REGISTRATION_REJECTED:
      return {
        ...state,
        loading: false,
        checkRegistrationData: action.payload
      };

    case TOGGLE_PHONE_VERIFICATION_MODAL:
      return {
        ...state,
        phoneVerificationModal: !state.phoneVerificationModal,
        search_selected_business_id: action.payload
      };

    default:
      return state;
  }
}
