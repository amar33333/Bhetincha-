import {
  FETCH_INDUSTRY_PENDING,
  FETCH_INDUSTRY_FULFILLED,
  FETCH_INDUSTRY_REJECTED,
  FETCH_INDUSTRY_EACH_FULFILLED,
  FETCH_INDUSTRY_EACH_REJECTED,
  FETCH_INDUSTRY_EACH_PENDING
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: ""
};

export default function(state = INITIAL_STATE, action) {
  console.log("asd: ", action);
  switch (action.type) {
    case FETCH_INDUSTRY_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case FETCH_INDUSTRY_FULFILLED:
      console.log("inside: ", action);
      return {
        ...state,
        industries: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_INDUSTRY_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

    case FETCH_INDUSTRY_EACH_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case FETCH_INDUSTRY_EACH_FULFILLED:
      console.log("inside: ", action);
      return {
        ...state,
        industryData: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_INDUSTRY_EACH_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

    default:
      return state;
  }
}
