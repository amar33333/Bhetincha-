import {
  FETCH_ECOMMERCE_CATEGORIES_FULFILLED,
  FETCH_ECOMMERCE_CATEGORY_CONFIG_FULFILLED,
  FETCH_ECOMMERCE_PRODUCTS_FULFILLED,
  CHANGE_ACTIVE_ECOMMERCE_CATEGORY
} from "../actions/types";

const INITIAL_STATE = {
  categories: {},
  activeCategory: "",
  childCategories: [],
  filterAttributes: [],
  productCount: 0,
  products: [],
  breadcrumbs: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ECOMMERCE_CATEGORIES_FULFILLED:
      return {
        ...state,
        categories: action.payload,
        activeCategory: action.changeActive
          ? action.payload.uid
          : state.activeCategory
      };

    case CHANGE_ACTIVE_ECOMMERCE_CATEGORY:
      return { ...state, activeCategory: action.payload.categoryId };

    case FETCH_ECOMMERCE_CATEGORY_CONFIG_FULFILLED:
      return {
        ...state,
        childCategories: action.payload.child,
        filterAttributes: action.payload.filterableAttributes,
        breadcrumbs: action.payload.breadCrumbs
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
