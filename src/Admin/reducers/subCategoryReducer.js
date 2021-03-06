import {
  FETCH_SUB_CATEGORY_FULFILLED,
  FETCH_SUB_CATEGORY_REJECTED,
  FETCH_SUB_CATEGORY_PENDING,
  CREATE_SUB_CATEGORY_FULFILLED,
  CREATE_SUB_CATEGORY_PENDING,
  CREATE_SUB_CATEGORY_REJECTED,
  EDIT_SUB_CATEGORY_FULFILLED,
  EDIT_SUB_CATEGORY_PENDING,
  EDIT_SUB_CATEGORY_REJECTED,
  TOGGLE_SUB_CATEGORY_EDIT_MODAL,
  FETCH_SUB_CATEGORY_ARRAY_PENDING,
  FETCH_SUB_CATEGORY_ARRAY_FULFILLED,
  FETCH_SUB_CATEGORY_ARRAY_REJECTED,
  RESET_SUB_CATEGORY_ERRORS,
  UNMOUNT_SUB_CATEGORY
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  error: false,
  fetchLoading: false,
  subCategories: [],
  pages: 1,
  rowCount: 0,
  subCategoryEditModal: false,
  subCategoryEditData: null,
  subCategoryErrors: null,
  subCategoryEditErrors: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_SUB_CATEGORY_ERRORS:
      return {
        ...state,
        subCategoryErrors: null,
        subCategoryEditErrors: null
      };
    case UNMOUNT_SUB_CATEGORY:
      return { ...state, subCategories: [] };

    case EDIT_SUB_CATEGORY_PENDING:
      return { ...state, loading: true, error: false };

    case EDIT_SUB_CATEGORY_REJECTED:
      return {
        ...state,
        loading: false,
        error: true,
        subCategoryEditErrors: action.payload
      };

    case EDIT_SUB_CATEGORY_FULFILLED:
      return {
        ...state,
        loading: false,
        error: false,
        subCategoryEditErrors: null
      };

    case CREATE_SUB_CATEGORY_PENDING:
      return { ...state, loading: true, error: false };

    case CREATE_SUB_CATEGORY_REJECTED:
      return {
        ...state,
        loading: false,
        error: true,
        subCategoryErrors: action.payload
      };

    case CREATE_SUB_CATEGORY_FULFILLED:
      return {
        ...state,
        loading: false,
        error: false,
        subCategoryErrors: null
      };

    case FETCH_SUB_CATEGORY_PENDING:
      return { ...state, fetchLoading: true };

    case FETCH_SUB_CATEGORY_FULFILLED:
      return {
        ...state,
        subCategories: action.payload.data.map((subCategory, i) => ({
          ...subCategory,
          s_no: action.payload.rows * (action.payload.page - 1) + i + 1
        })),
        pages: action.payload.pages,
        rowCount: action.payload.rowCount,
        fetchLoading: false
      };

    case FETCH_SUB_CATEGORY_REJECTED:
      return { ...state, fetchLoading: false };

    case TOGGLE_SUB_CATEGORY_EDIT_MODAL:
      return {
        ...state,
        subCategoryEditModal: !state.subCategoryEditModal,
        subCategoryEditData: action.payload
      };

    default:
      return state;
  }
}
