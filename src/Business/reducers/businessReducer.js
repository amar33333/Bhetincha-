import {
  FETCH_BUSINESS_FULFILLED,
  FETCH_BUSINESS_PENDING,
  FETCH_BUSINESS_REJECTED,
  FETCH_PAYMENT_METHODS_FULFILLED,
  FETCH_PAYMENT_METHODS_REJECTED,
  FETCH_PAYMENT_METHODS_PENDING,
  FETCH_COMPANY_TYPE_FULFILLED,
  FETCH_COMPANY_TYPE_REJECTED,
  FETCH_COMPANY_TYPE_PENDING,
  FETCH_BUSINESS_EACH_FULFILLED,
  FETCH_BUSINESS_EACH_REJECTED,
  FETCH_BUSINESS_EACH_PENDING,
  EDIT_BUSINESS_FULFILLED,
  EDIT_BUSINESS_PENDING,
  EDIT_BUSINESS_REJECTED,
  EDIT_PRIMARY_ADDRESS_FULFILLED,
  EDIT_PRIMARY_ADDRESS_PENDING,
  EDIT_PRIMARY_ADDRESS_REJECTED,
  FETCH_PRIMARY_ADDRESS_FULFILLED,
  FETCH_PRIMARY_ADDRESS_PENDING,
  FETCH_PRIMARY_ADDRESS_REJECTED,
  FETCH_ABOUT_FULFILLED,
  FETCH_ABOUT_PENDING,
  FETCH_ABOUT_REJECTED,
  EDIT_ABOUT_FULFILLED,
  EDIT_ABOUT_PENDING,
  EDIT_ABOUT_REJECTED,
  FETCH_WORKING_HOUR_FULFILLED,
  FETCH_WORKING_HOUR_PENDING,
  FETCH_WORKING_HOUR_REJECTED,
  EDIT_WORKING_HOUR_FULFILLED,
  EDIT_WORKING_HOUR_PENDING,
  EDIT_WORKING_HOUR_REJECTED,
  TOGGLE_EDIT
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: "",
  EDIT: false,

  company_types: [],

  fetchLoading: false,
  businessGet: false,
  primary_address_details: null,
  about: null,
  workingHour: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_BUSINESS_PENDING:
      return { ...state, loading: true };

    case FETCH_BUSINESS_FULFILLED:
      return {
        ...state,
        businessData: action.payload,
        loading: false
      };

    case FETCH_BUSINESS_REJECTED:
      return { ...state, loading: false };

    case FETCH_ABOUT_PENDING:
      return { ...state, businessGet: true, loading: true };

    case FETCH_ABOUT_FULFILLED:
      return {
        ...state,
        businessGet: false,
        about: action.payload,
        loading: false
      };

    case FETCH_ABOUT_REJECTED:
      return { ...state, businessGet: false, loading: false };

    case EDIT_ABOUT_PENDING:
      return { ...state, businessGet: true, loading: true };

    case EDIT_ABOUT_FULFILLED:
      return {
        ...state,
        businessGet: true,
        loading: false
      };

    case EDIT_ABOUT_REJECTED:
      return { ...state, loading: false, businessGet: true };

    case FETCH_WORKING_HOUR_PENDING:
      return { ...state, businessGet: true, loading: true };

    case FETCH_WORKING_HOUR_FULFILLED:
      return {
        ...state,
        businessGet: false,
        workingHour: action.payload,
        loading: false
      };

    case FETCH_WORKING_HOUR_REJECTED:
      return { ...state, businessGet: false, loading: false };

    case EDIT_WORKING_HOUR_PENDING:
      return { ...state, businessGet: true, loading: true };

    case EDIT_WORKING_HOUR_FULFILLED:
      return {
        ...state,
        businessGet: true,
        loading: false
      };

    case EDIT_WORKING_HOUR_REJECTED:
      return { ...state, loading: false, businessGet: true };

    case FETCH_PRIMARY_ADDRESS_PENDING:
      return { ...state, businessGet: true, loading: true };

    case FETCH_PRIMARY_ADDRESS_FULFILLED:
      return {
        ...state,
        businessGet: false,
        primary_address_details: action.payload,
        loading: false
      };

    case FETCH_PRIMARY_ADDRESS_REJECTED:
      return { ...state, businessGet: false, loading: false };

    case EDIT_PRIMARY_ADDRESS_PENDING:
      return { ...state, businessGet: true, loading: true };

    case EDIT_PRIMARY_ADDRESS_FULFILLED:
      return {
        ...state,
        businessGet: true,
        loading: false
      };

    case EDIT_PRIMARY_ADDRESS_REJECTED:
      return { ...state, loading: false, businessGet: true };

    case EDIT_BUSINESS_PENDING:
      return { ...state, fetchLoading: true, businessGet: true };

    case EDIT_BUSINESS_REJECTED:
      return { ...state, fetchLoading: false, businessGet: true };

    case EDIT_BUSINESS_FULFILLED:
      return {
        ...state,
        fetchLoading: false,
        businessGet: true,
        editBusinessSuccess: action.payload
      };

    case FETCH_BUSINESS_EACH_PENDING:
      return { ...state, fetchLoading: true, businessGet: true };

    case FETCH_BUSINESS_EACH_REJECTED:
      console.log("business get: ", action);

      return { ...state, fetchLoading: false, businessGet: false };

    case FETCH_BUSINESS_EACH_FULFILLED:
      return {
        ...state,
        businessData: action.payload,
        fetchLoading: false,
        businessGet: false
      };

    case TOGGLE_EDIT:
      // console.log("toogle edit: ", action.payload);
      return { ...state, EDIT: action.payload, loading: false };

    case FETCH_PAYMENT_METHODS_PENDING:
      return { ...state, loading: true };

    case FETCH_PAYMENT_METHODS_FULFILLED:
      return {
        ...state,
        payment_methods: action.payload,
        loading: false
      };

    case FETCH_PAYMENT_METHODS_REJECTED:
      return { ...state, loading: false };

    case FETCH_COMPANY_TYPE_PENDING:
      return { ...state, loading: true };

    case FETCH_COMPANY_TYPE_FULFILLED:
      return {
        ...state,
        company_types: action.payload,
        loading: false
      };

    case FETCH_COMPANY_TYPE_REJECTED:
      return { ...state, loading: false };

    default:
      return state;
  }
}
