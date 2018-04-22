import {
  FETCH_INDUSTRY_PENDING,
  FETCH_INDUSTRY_FULFILLED,
  FETCH_INDUSTRY_REJECTED,
  CREATE_INDUSTRY_PENDING,
  CREATE_INDUSTRY_FULFILLED,
  CREATE_INDUSTRY_REJECTED,
  UNMOUNT_INDUSTRY
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UNMOUNT_INDUSTRY:
      return {
        ...state,
        data: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case CREATE_INDUSTRY_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case CREATE_INDUSTRY_FULFILLED:
      return {
        ...state,
        ...action.payload.data,
        loading: false,
        statusClass: "fulfilled"
      };

    case CREATE_INDUSTRY_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

    case FETCH_INDUSTRY_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case FETCH_INDUSTRY_FULFILLED:
      // console.log("fuludids");
      return {
        ...state,
        data: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_INDUSTRY_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

    default:
      return state;
  }
}
