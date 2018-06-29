import {
  FETCH_ECOMMERCE_CATEGORIES_FULFILLED,
  CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
  OPEN_ALL_ON_SEARCH,
  FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_FULFILLED,
  FETCH_ECOMMERCE_CATEGORY_PRODUCTS_FULFILLED,
  CREATE_ECOMMERCE_PRODUCT_FULFILLED,
  CREATE_ECOMMERCE_PRODUCT_PENDING,
  CREATE_ECOMMERCE_PRODUCT_REJECTED,
  FETCH_ECOMMERCE_PRODUCT_EACH_FULFILLED,
  FETCH_ECOMMERCE_PRODUCT_EACH_PENDING,
  FETCH_ECOMMERCE_PRODUCT_EACH_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  categories: null,
  activeCategory: "",
  isOpenCategories: [],
  attributes: null,
  selectedCategoryDetail: null,
  productError: false,
  productLoading: false,
  productDetail: null
};

export default function(state = INITIAL_STATE, action) {
  let isOpenCategories;

  switch (action.type) {
    case CREATE_ECOMMERCE_PRODUCT_FULFILLED:
      return { ...state, productLoading: false, productError: false };

    case CREATE_ECOMMERCE_PRODUCT_PENDING:
      return { ...state, productLoading: true, productError: false };

    case CREATE_ECOMMERCE_PRODUCT_REJECTED:
      return { ...state, productLoading: false, productError: true };

    case FETCH_ECOMMERCE_PRODUCT_EACH_FULFILLED:
      return { ...state, productDetail: action.payload };

    case FETCH_ECOMMERCE_PRODUCT_EACH_PENDING:
      return { ...state, productDetail: null };

    case FETCH_ECOMMERCE_CATEGORIES_FULFILLED:
      return {
        ...state,
        categories: action.payload
      };

    case FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_FULFILLED:
      return {
        ...state,
        attributes: action.payload
      };

    case FETCH_ECOMMERCE_CATEGORY_PRODUCTS_FULFILLED:
      return {
        ...state,
        selectedCategoryDetail: action.payload
      };

    case CHANGE_ACTIVE_ECOMMERCE_CATEGORY:
      const extra = {};
      const uid = action.payload;
      isOpenCategories = state.isOpenCategories;
      let { activeCategory } = state;
      if (isOpenCategories.includes(uid)) {
        isOpenCategories = isOpenCategories.filter(data => data !== uid);
      } else {
        isOpenCategories = [...isOpenCategories, uid];
      }
      if (activeCategory !== uid) {
        extra.activeCategory = uid;
      }
      return { ...state, isOpenCategories, ...extra };

    case OPEN_ALL_ON_SEARCH:
      isOpenCategories = [];

      const updateIsOpenCategories = category => {
        const { children, uid } = category;
        const extra = {};
        if (children && children.length) {
          extra.children = children.map(subCategory =>
            updateIsOpenCategories(subCategory)
          );
        }

        if (category.toggled) {
          isOpenCategories.push(uid);
        }
        return category;
      };

      updateIsOpenCategories(action.payload);

      return { ...state, isOpenCategories };

    default:
      return state;
  }
}
