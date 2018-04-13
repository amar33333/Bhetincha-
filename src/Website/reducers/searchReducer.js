import {
  SEARCH_QUERY_PENDING,
  SEARCH_QUERY_FULFILLED,
  SEARCH_QUERY_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  loading: false
};

export default function(state = INITIAL_STATE, action) {
  // console.log("actionsL: ", action);
  switch (action.type) {
    case SEARCH_QUERY_PENDING:
      return {
        ...state,
        loading: true
      };

    case SEARCH_QUERY_FULFILLED:
      return {
        ...state,
        data: action.payload,
        loading: false
      };

    case SEARCH_QUERY_REJECTED:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
