import { FETCH_ECOMMERCE_PRODUCT_FULFILLED } from "../actions/types";

const INITIAL_STATE = {
  product: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ECOMMERCE_PRODUCT_FULFILLED:
      return {
        ...state,
        product: action.payload
      };

    default:
      return state;
  }
}
