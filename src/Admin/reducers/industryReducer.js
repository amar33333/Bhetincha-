import {
  FETCH_INDUSTRY_PENDING,
  FETCH_INDUSTRY_FULFILLED,
  FETCH_INDUSTRY_REJECTED,
  CREATE_INDUSTRY_PENDING,
  CREATE_INDUSTRY_FULFILLED,
  CREATE_INDUSTRY_REJECTED,
  EDIT_INDUSTRY_PENDING,
  EDIT_INDUSTRY_FULFILLED,
  EDIT_INDUSTRY_REJECTED,
  FETCH_INDUSTRY_EACH_FULFILLED,
  FETCH_INDUSTRY_EACH_REJECTED,
  FETCH_INDUSTRY_EACH_PENDING,
  TOGGLE_INDUSTRY_EDIT_MODAL,
  RESET_INDUSTRY_ERRORS,
  UNMOUNT_INDUSTRY_DATA,
  UNMOUNT_INDUSTRY
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  error: false,
  fetchLoading: false,
  fetchLoadingData: false,
  fetchError: "",
  industries: [],
  industriesData: [],
  industryData: null,
  industryEditModal: false,
  industryErrors: null,
  industryEditErrors: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_INDUSTRY_ERRORS:
      return {
        ...state,
        industryErrors: null,
        industryEditErrors: null
      };

    case UNMOUNT_INDUSTRY:
      return { ...state, industries: [] };

    case EDIT_INDUSTRY_PENDING:
      return { ...state, loading: true, error: false };

    case EDIT_INDUSTRY_REJECTED:
      return {
        ...state,
        loading: false,
        error: true,
        industryEditErrors: action.payload
      };

    case EDIT_INDUSTRY_FULFILLED:
      return {
        ...state,
        loading: false,
        error: false,
        industryEditErrors: null
      };

    case CREATE_INDUSTRY_PENDING:
      return { ...state, loading: true, error: false };

    case CREATE_INDUSTRY_REJECTED:
      return {
        ...state,
        loading: false,
        error: true,
        industryErrors: action.payload
      };

    case CREATE_INDUSTRY_FULFILLED:
      return { ...state, loading: false, error: false, industryErrors: null };

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

    case TOGGLE_INDUSTRY_EDIT_MODAL:
      return {
        ...state,
        industryEditModal: !state.industryEditModal,
        industryEditData: action.payload
      };

    case UNMOUNT_INDUSTRY_DATA:
      return { ...state, industryData: [] };

    default:
      return state;
  }
}
