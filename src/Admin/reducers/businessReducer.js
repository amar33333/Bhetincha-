import {
  CREATE_COMPANY_TYPE_FULFILLED,
  CREATE_COMPANY_TYPE_PENDING,
  CREATE_COMPANY_TYPE_REJECTED,
  CREATE_PAYMENT_METHODS_FULFILLED,
  CREATE_PAYMENT_METHODS_PENDING,
  CREATE_PAYMENT_METHODS_REJECTED,
  FETCH_PAYMENT_METHODS_FULFILLED,
  FETCH_PAYMENT_METHODS_REJECTED,
  FETCH_PAYMENT_METHODS_PENDING,
  FETCH_COMPANY_TYPE_FULFILLED,
  FETCH_COMPANY_TYPE_REJECTED,
  FETCH_COMPANY_TYPE_PENDING,
  FETCH_BUSINESS_FULFILLED,
  FETCH_BUSINESS_PENDING,
  FETCH_BUSINESS_REJECTED,
  FETCH_BUSINESS_EACH_FULFILLED,
  FETCH_BUSINESS_EACH_REJECTED,
  FETCH_BUSINESS_EACH_PENDING
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: "",

  company_types: [],

  businesses: [],
  page: 1,
  rows: 20,
  pages: 3,
  fetchLoading: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_BUSINESS_PENDING:
      return { ...state, fetchLoading: true };

    case FETCH_BUSINESS_REJECTED:
      return { ...state, fetchLoading: false };

    case FETCH_BUSINESS_FULFILLED:
      return {
        ...state,
        fetchLoading: false,
        businesses: action.payload.data,
        page: action.payload.page,
        rows: action.payload.rows,
        pages: action.payload.pages
      };

    case FETCH_BUSINESS_EACH_PENDING:
      return { ...state, fetchLoading: true };

    case FETCH_BUSINESS_EACH_REJECTED:
      return { ...state, fetchLoading: false };

    case FETCH_BUSINESS_EACH_FULFILLED:
      return {
        ...state,
        businessData: action.payload
      };

    case CREATE_PAYMENT_METHODS_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case CREATE_PAYMENT_METHODS_FULFILLED:
      return {
        ...state,
        paymentMethods: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case CREATE_PAYMENT_METHODS_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

    case CREATE_COMPANY_TYPE_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case CREATE_COMPANY_TYPE_FULFILLED:
      return {
        ...state,
        companyTypes: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case CREATE_COMPANY_TYPE_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

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
