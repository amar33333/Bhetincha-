import {
  FETCH_INDUSTRY_PENDING,
  FETCH_INDUSTRY_FULFILLED,
  FETCH_INDUSTRY_REJECTED,
  FETCH_INDUSTRY_EACH_FULFILLED,
  FETCH_INDUSTRY_EACH_REJECTED,
  FETCH_INDUSTRY_EACH_PENDING,
  UNMOUNT_INDUSTRY_DATA
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  error: "",
  fetchLoading: false,
  fetchLoadingData: false,
  fetchError: "",
  industries: [],
  industryData: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_INDUSTRY_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case FETCH_INDUSTRY_FULFILLED:
      return {
        ...state,
        industries: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_INDUSTRY_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

    case FETCH_INDUSTRY_EACH_PENDING:
      return { ...state, fetchLoadingData: true };

    case FETCH_INDUSTRY_EACH_FULFILLED:
      return {
        ...state,
        industryData: action.payload,
        fetchLoadingData: false
      };

    case FETCH_INDUSTRY_EACH_REJECTED:
      return { ...state, fetchLoadingData: false };

    case UNMOUNT_INDUSTRY_DATA:
      return { ...state, industryData: [] };

    default:
      return state;
  }
}
