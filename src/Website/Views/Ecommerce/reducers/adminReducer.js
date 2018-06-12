import {
  FETCH_ECOMMERCE_CATEGORIES_FULFILLED,
  CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
  FETCH_ECOMMERCE_CATEGORY_FULFILLED
} from "../actions/types";

const INITIAL_STATE = {
  categories: {},
  activeCategory: "",
  isOpenCategories: [],
  selectedCategoryDetail: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ECOMMERCE_CATEGORIES_FULFILLED:
      return {
        ...state,
        categories: action.payload
      };

    case CHANGE_ACTIVE_ECOMMERCE_CATEGORY:
      const extra = {};
      const uid = action.payload;
      let { isOpenCategories, activeCategory } = state;
      if (isOpenCategories.includes(uid)) {
        isOpenCategories = isOpenCategories.filter(data => data !== uid);
      } else {
        isOpenCategories = [...isOpenCategories, uid];
      }
      if (activeCategory !== uid) {
        extra.activeCategory = uid;
      }
      return { ...state, isOpenCategories, ...extra };

    case FETCH_ECOMMERCE_CATEGORY_FULFILLED:
      return { ...state, selectedCategoryDetail: action.payload };

    default:
      return state;
  }
}
