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
  FETCH_BUSINESS_EACH_PENDING,
  EDIT_BUSINESS_FULFILLED,
  EDIT_BUSINESS_PENDING,
  EDIT_BUSINESS_REJECTED,
  TOGGLE_EDIT,
  TOGGLE_COMPANY_TYPE_EDIT_MODAL,
  TOGGLE_PAYMENT_METHOD_EDIT_MODAL,
  UNMOUNT_PAYMENT_METHOD,
  UNMOUNT_COMPANY_TYPE
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: "",
  EDIT: false,

  company_types: [],
  companyTypesFetchLoading: false,
  companyTypeError: false,
  companyTypeLoading: false,

  payment_methods: [],
  paymentMethodsFetchLoading: false,
  paymentMethodError: false,
  paymentMethodLoading: false,

  businesses: [],
  pages: 1,
  fetchLoading: false,
  businessGet: false,
  rowCount: 0,

  companyTypeEditModal: false,
  paymentMethodEditModal: false
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
        pages: action.payload.pages,
        rowCount: action.payload.rowCount
      };

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
      return { ...state, fetchLoading: false, businessGet: false };
    case FETCH_BUSINESS_EACH_FULFILLED:
      return {
        ...state,
        businessData: action.payload,
        fetchLoading: false,
        businessGet: false
      };

    case CREATE_PAYMENT_METHODS_PENDING:
      return {
        ...state,
        paymentMethodLoading: true,
        paymentMethodError: false
      };
    case CREATE_PAYMENT_METHODS_FULFILLED:
      return {
        ...state,
        paymentMethodLoading: false,
        paymentMethodError: false
      };
    case CREATE_PAYMENT_METHODS_REJECTED:
      return {
        ...state,
        paymentMethodLoading: false,
        paymentMethodError: true
      };

    case FETCH_PAYMENT_METHODS_PENDING:
      return { ...state, paymentMethodsFetchLoading: true };
    case FETCH_PAYMENT_METHODS_FULFILLED:
      return {
        ...state,
        payment_methods: action.payload.map((paymentMethod, i) => ({
          ...paymentMethod,
          s_no: i + 1
        })),
        paymentMethodsFetchLoading: false
      };
    case FETCH_PAYMENT_METHODS_REJECTED:
      return { ...state, paymentMethodsFetchLoading: false };

    case UNMOUNT_PAYMENT_METHOD:
      return { ...state, payment_methods: [] };

    case CREATE_COMPANY_TYPE_PENDING:
      return {
        ...state,
        companyTypeLoading: true,
        companyTypeError: false
      };
    case CREATE_COMPANY_TYPE_FULFILLED:
      return {
        ...state,
        companyTypeLoading: false,
        companyTypeError: false
      };
    case CREATE_COMPANY_TYPE_REJECTED:
      return {
        ...state,
        companyTypeLoading: false,
        companyTypeError: true
      };

    case FETCH_COMPANY_TYPE_PENDING:
      return { ...state, companyTypesFetchLoading: true };
    case FETCH_COMPANY_TYPE_FULFILLED:
      return {
        ...state,
        company_types: action.payload.map((companyType, i) => ({
          ...companyType,
          s_no: i + 1
        })),
        companyTypesFetchLoading: false
      };
    case FETCH_COMPANY_TYPE_REJECTED:
      return { ...state, companyTypesFetchLoading: false };

    case UNMOUNT_COMPANY_TYPE:
      return { ...state, company_types: [] };

    case TOGGLE_EDIT:
      return { ...state, EDIT: action.payload, loading: false };

    case TOGGLE_COMPANY_TYPE_EDIT_MODAL:
      return {
        ...state,
        companyTypeEditModal: !state.companyTypeEditModal,
        companyTypeEditData: action.payload
      };

    case TOGGLE_PAYMENT_METHOD_EDIT_MODAL:
      return {
        ...state,
        paymentMethodEditModal: !state.paymentMethodEditModal,
        paymentMethodEditData: action.payload
      };

    default:
      return state;
  }
}
