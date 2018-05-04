import {
  FETCH_INDUSTRY_PENDING,
  FETCH_INDUSTRY_FULFILLED,
  FETCH_INDUSTRY_REJECTED,
  CREATE_INDUSTRY_PENDING,
  CREATE_INDUSTRY_FULFILLED,
  CREATE_INDUSTRY_REJECTED,
  FETCH_INDUSTRY_EACH_FULFILLED,
  FETCH_INDUSTRY_EACH_REJECTED,
  FETCH_INDUSTRY_EACH_PENDING,
  UNMOUNT_INDUSTRY_DATA,
  UNMOUNT_INDUSTRY
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  error: "",
  fetchLoading: false,
  fetchLoadingData: false,
  fetchError: "",
  industries: [],
  industriesData: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UNMOUNT_INDUSTRY:
      return {
        ...state,
        industries: [],
        loading: false
      };

    case CREATE_INDUSTRY_PENDING:
      return { ...state, loading: true };

    case CREATE_INDUSTRY_REJECTED:
    case CREATE_INDUSTRY_FULFILLED:
      return { ...state, loading: false };

    case FETCH_INDUSTRY_PENDING:
      return { ...state, fetchLoading: true };

    case FETCH_INDUSTRY_FULFILLED:
      return {
        ...state,
        industries: action.payload.map((industry, i) => ({
          ...industry,
          s_no: i + 1
        })),
        fetchLoading: false
      };

    case FETCH_INDUSTRY_REJECTED:
      return { ...state, fetchLoading: false };

    case FETCH_INDUSTRY_EACH_PENDING:
      return { ...state, fetchLoadingData: true };

    case FETCH_INDUSTRY_EACH_FULFILLED:
      return {
        ...state,
        industryData: action.payload,
        industriesData: action.payload.categories.map((industry, i) => ({
          ...industry,
          s_no: i + 1
        })),
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
