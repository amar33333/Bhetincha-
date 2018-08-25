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
  FETCH_ECOMMERCE_PRODUCT_EACH_REJECTED,
  UPDATE_ECOMMERCE_PRODUCT_PENDING,
  UPDATE_ECOMMERCE_PRODUCT_FULFILLED,
  UPDATE_ECOMMERCE_PRODUCT_REJECTED,
  FETCH_ECOMMERCE_CATEGORY_PRODUCTS_PENDING
} from "../actions/types";
import { FETCH_ECOMMERCE_PRODUCTS_REJECTED } from "../../Website/Views/Ecommerce/actions/types";

const INITIAL_STATE = {
  categories: null,
  activeCategory: "",
  isOpenCategories: [],
  attributes: null,
  selectedCategoryDetail: null,
  productError: false,
  productLoading: false,
  productDetail: null,
  productsFetchLoading: false,
  count: 20,
  page: 1
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

    case UPDATE_ECOMMERCE_PRODUCT_FULFILLED:
      return { ...state, productLoading: false, productError: false };

    case UPDATE_ECOMMERCE_PRODUCT_PENDING:
      return { ...state, productLoading: true, productError: false };

    case UPDATE_ECOMMERCE_PRODUCT_REJECTED:
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

    case FETCH_ECOMMERCE_CATEGORY_PRODUCTS_PENDING:
      return {
        ...state,
        count:
          action.payload && action.payload.count !== undefined
            ? action.payload.count
            : state.count,
        page:
          action.payload && action.payload.page !== undefined
            ? action.payload.page
            : state.page,
        productsFetchLoading: true
      };

    case FETCH_ECOMMERCE_CATEGORY_PRODUCTS_FULFILLED:
      return {
        ...state,
        selectedCategoryDetail: {
          ...action.payload,
          products: action.payload.products.map((product, i) => ({
            ...product,
            s_no: state.count * (state.page - 1) + i + 1
          }))
        },
        productsFetchLoading: false
      };

    case FETCH_ECOMMERCE_PRODUCTS_REJECTED:
      return { ...state, productsFetchLoading: false };

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
