import {
  CREATE_COMPANY_TYPE_FULFILLED,
  CREATE_COMPANY_TYPE_PENDING,
  CREATE_COMPANY_TYPE_REJECTED,
  CREATE_PAYMENT_METHODS_FULFILLED,
  CREATE_PAYMENT_METHODS_PENDING,
  CREATE_PAYMENT_METHODS_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
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

    default:
      return state;
  }
}
