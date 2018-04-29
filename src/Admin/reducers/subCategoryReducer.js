import {
  FETCH_SUB_CATEGORY_FULFILLED,
  FETCH_SUB_CATEGORY_REJECTED,
  FETCH_SUB_CATEGORY_PENDING,
  UNMOUNT_SUB_CATEGORY
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UNMOUNT_SUB_CATEGORY:
      return {
        ...state,
        subCategories: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };
    case FETCH_SUB_CATEGORY_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case FETCH_SUB_CATEGORY_FULFILLED:
      return {
        ...state,
        subCategories: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_SUB_CATEGORY_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

    default:
      return state;
  }
}
