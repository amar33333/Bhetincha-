import {
  FETCH_CATEGORY_EACH_FULFILLED,
  FETCH_CATEGORY_EACH_REJECTED,
  FETCH_CATEGORY_EACH_PENDING,
  UNMOUNT_SUB_CATEGORY
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: ""
};

export default function(state = INITIAL_STATE, action) {
  console.log("category action: ", action);
  switch (action.type) {
    case FETCH_CATEGORY_EACH_PENDING:
      return { ...state, loading: true };

    case FETCH_CATEGORY_EACH_FULFILLED:
      console.log("category reducer: ", action);
      return {
        ...state,
        categoryData: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_CATEGORY_EACH_REJECTED:
      return { ...state, loading: false };

    case UNMOUNT_SUB_CATEGORY:
      return {
        ...state,
        loading: false,
        categoryData: action.payload
      };
    default:
      return state;
  }
}
