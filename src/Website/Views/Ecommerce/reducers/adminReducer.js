import {
  FETCH_CATEGORIES_FULFILLED,
  FETCH_CATEGORIES_PENDING,
  FETCH_CATEGORIES_REJECTED,
  CHANGE_ACTIVE_CATEGORY
} from "../actions/types";

const INITIAL_STATE = {
  categories: {},
  activeCategory: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_FULFILLED:
      return {
        ...state,
        categories: action.payload
      };

    case CHANGE_ACTIVE_CATEGORY:
      return { ...state, activeCategory: action.payload };

    default:
      return state;
  }
}
