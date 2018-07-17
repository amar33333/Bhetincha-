import { FETCH_ECOMMERCE_CATEGORIES_FULFILLED } from "../actions/types";

const INITIAL_STATE = {
  categories: {},
  activeCategory: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ECOMMERCE_CATEGORIES_FULFILLED:
      return {
        ...state,
        categories: action.payload
      };

    default:
      return state;
  }
}
