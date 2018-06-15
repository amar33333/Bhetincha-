import {
  FETCH_BUSINESS_TELE_CALLING_FULFILLED,
  FETCH_BUSINESS_TELE_CALLING_PENDING,
  FETCH_BUSINESS_TELE_CALLING_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  businessFetchLoading: false,
  business: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_BUSINESS_TELE_CALLING_PENDING:
      return { ...state, businessFetchLoading: false };

    case FETCH_BUSINESS_TELE_CALLING_FULFILLED:
      return { ...state, business: action.payload, businessFetchLoading: true };

    default:
      return state;
  }
}
