import {
  FETCH_ECOMMERCE_CATEGORIES_FULFILLED,
  CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
  FETCH_ECOMMERCE_CATEGORY_FULFILLED,
  FETCH_ECOMMERCE_ATTRIBUTES_FULFILLED,
  OPEN_ALL_ON_SEARCH,
  CREATE_ECOMMERCE_PROPERTY_CATEGORY_FULFILLED,
  CREATE_ECOMMERCE_PROPERTY_CATEGORY_PENDING,
  CREATE_ECOMMERCE_PROPERTY_CATEGORY_REJECTED,
  FETCH_ECOMMERCE_ROOT_CATEGORIES_FULFILLED
} from "../actions/types";

const INITIAL_STATE = {
  categories: {},
  rootCategories: [],
  activeCategory: "",
  isOpenCategories: [],
  selectedCategoryDetail: null,
  attributes: [],
  propertyLoading: false,
  propertyError: false
};

export default function(state = INITIAL_STATE, action) {
  let isOpenCategories;

  switch (action.type) {
    case CREATE_ECOMMERCE_PROPERTY_CATEGORY_FULFILLED:
      return { ...state, propertyLoading: false, propertyError: false };

    case CREATE_ECOMMERCE_PROPERTY_CATEGORY_PENDING:
      return { ...state, propertyLoading: true, propertyError: false };

    case CREATE_ECOMMERCE_PROPERTY_CATEGORY_REJECTED:
      return { ...state, propertyLoading: false, propertyError: true };

    case FETCH_ECOMMERCE_ATTRIBUTES_FULFILLED:
      return { ...state, attributes: action.payload };

    case FETCH_ECOMMERCE_CATEGORIES_FULFILLED:
      return { ...state, categories: action.payload };

    case FETCH_ECOMMERCE_ROOT_CATEGORIES_FULFILLED:
      return { ...state, rootCategories: action.payload };

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
