import {
  FETCH_ECOMMERCE_PRODUCT_FULFILLED,
  FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_FULFILLED
} from "../actions/types";

const INITIAL_STATE = {
  product: null,
  attributes: [],
  breadcrumbs: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ECOMMERCE_PRODUCT_FULFILLED:
      return {
        ...state,
        product: action.payload
      };

    case FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_FULFILLED:
      return {
        ...state,
        attributes: action.payload.attributes,
        breadcrumbs: action.payload.breadCrumbs
      };

    default:
      return state;
  }
}
