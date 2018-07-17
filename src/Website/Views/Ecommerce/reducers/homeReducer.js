import {
  FETCH_ECOMMERCE_CATEGORIES_FULFILLED,
  FETCH_ECOMMERCE_CATEGORY_CONFIG_FULFILLED,
  FETCH_ECOMMERCE_PRODUCTS_FULFILLED
} from "../actions/types";

const INITIAL_STATE = {
  categories: {},
  activeCategory: "",
  childCategories: [],
  filterAttributes: [],
  productCount: 0,
  products: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ECOMMERCE_CATEGORIES_FULFILLED:
      return {
        ...state,
        categories: action.payload,
        activeCategory: action.payload.uid
      };

    case FETCH_ECOMMERCE_CATEGORY_CONFIG_FULFILLED:
      return {
        ...state,
        childCategories: action.payload.child,
        filterAttributes: action.payload.filterableAttributes
      };

    case FETCH_ECOMMERCE_PRODUCTS_FULFILLED:
      return {
        ...state,
        productCount: action.payload.hits.total,
        products: action.payload.hits.hits
      };

    default:
      return state;
  }
}
