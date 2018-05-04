import {
  FETCH_SUB_CATEGORY_FULFILLED,
  FETCH_SUB_CATEGORY_REJECTED,
  FETCH_SUB_CATEGORY_PENDING,
  UNMOUNT_SUB_CATEGORY
} from "../actions/types";

const INITIAL_STATE = {
  fetchLoading: false,
  subCategories: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UNMOUNT_SUB_CATEGORY:
      return { ...state, subCategories: [] };

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
