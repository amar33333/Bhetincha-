import {
  FETCH_ECOMMERCE_CATEGORIES_FULFILLED,
  CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
  FETCH_ECOMMERCE_CATEGORY_FULFILLED,
  OPEN_ALL_ON_SEARCH
} from "../actions/types";

const INITIAL_STATE = {
  categories: {},
  activeCategory: "",
  isOpenCategories: [],
  selectedCategoryDetail: null
};

export default function(state = INITIAL_STATE, action) {
  let isOpenCategories;

  switch (action.type) {
    case FETCH_ECOMMERCE_CATEGORIES_FULFILLED:
      return {
        ...state,
        categories: action.payload
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

    case FETCH_ECOMMERCE_CATEGORY_FULFILLED:
      return { ...state, selectedCategoryDetail: action.payload };

    case OPEN_ALL_ON_SEARCH:
      // isOpenCategories = [...state, isOpenCategories];
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
