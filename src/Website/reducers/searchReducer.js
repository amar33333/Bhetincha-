import {
  SEARCH_QUERY_PENDING,
  SEARCH_QUERY_FULFILLED,
  SEARCH_QUERY_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  data: []
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
      console.log("asdf", action.payload);
      return {
        ...state,
        data: action.payload.hits.map(hit => ({ ...hit._source })),
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
