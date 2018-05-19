import {
  FETCH_SUB_CATEGORY_FULFILLED,
  FETCH_SUB_CATEGORY_REJECTED,
  FETCH_SUB_CATEGORY_PENDING,
  CREATE_SUB_CATEGORY_FULFILLED,
  CREATE_SUB_CATEGORY_PENDING,
  CREATE_SUB_CATEGORY_REJECTED,
  UNMOUNT_SUB_CATEGORY
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  error: false,
  fetchLoading: false,
  subCategories: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UNMOUNT_SUB_CATEGORY:
      return { ...state, subCategories: [] };

    case CREATE_SUB_CATEGORY_PENDING:
      return { ...state, loading: true, error: false };

    case CREATE_SUB_CATEGORY_REJECTED:
      return { ...state, loading: false, error: true };

    case CREATE_SUB_CATEGORY_FULFILLED:
      return { ...state, loading: false, error: false };

    case FETCH_SUB_CATEGORY_PENDING:
      return { ...state, fetchLoading: true };

    case FETCH_SUB_CATEGORY_FULFILLED:
      return {
        ...state,
        subCategories: action.payload.map((subCategory, i) => ({
          ...subCategory,
          s_no: i + 1
        })),
        fetchLoading: false
      };

    case FETCH_SUB_CATEGORY_REJECTED:
      return { ...state, fetchLoading: false };

    default:
      return state;
  }
}
