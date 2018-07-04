import {
  SEARCH_QUERY_PENDING,
  SEARCH_QUERY_FULFILLED,
  SEARCH_QUERY_REJECTED,
  SEARCH_RESULTS_PAGE_FULFILLED,
  SEARCH_RESULTS_PAGE_PENDING,
  SEARCH_RESULTS_PAGE_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  search_results_page_loading: false,
  data: [],
  search_results_page_data: [],
  search_results_count: 0,
  time_taken: 0
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH_QUERY_PENDING:
      return {
        ...state,
        loading: true
      };

    case SEARCH_QUERY_FULFILLED:
      return {
        ...state,
        data: action.payload.hits.hits.map(hit => ({ ...hit._source })),
        loading: false
      };

    case SEARCH_QUERY_REJECTED:
      return {
        ...state,
        loading: false
      };

    case SEARCH_RESULTS_PAGE_PENDING:
      return {
        ...state,
        search_results_page_loading: true
      };

    case SEARCH_RESULTS_PAGE_FULFILLED:
      return {
        ...state,
        search_results_page_data: action.payload.hits.hits.map(hit => ({
          ...hit._source,
          id: hit._id
        })),
        search_results_count: action.payload.hits.total,
        time_taken: action.payload.took,
        search_results_page_loading: false
      };

    case SEARCH_RESULTS_PAGE_REJECTED:
      return {
        ...state,
        search_results_page_loading: false
      };

    default:
      return state;
  }
}
