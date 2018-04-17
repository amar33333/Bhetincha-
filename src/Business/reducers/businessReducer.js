import {
  FETCH_BUSINESS_FULFILLED,
  FETCH_BUSINESS_PENDING,
  FETCH_BUSINESS_REJECTED,
  FETCH_PAYMENT_METHODS_FULFILLED,
  FETCH_PAYMENT_METHODS_REJECTED,
  FETCH_PAYMENT_METHODS_PENDING,
  FETCH_COMPANY_TYPE_FULFILLED,
  FETCH_COMPANY_TYPE_REJECTED,
  FETCH_COMPANY_TYPE_PENDING
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: ""
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
