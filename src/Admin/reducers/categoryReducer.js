import {
  FETCH_CATEGORY_FULFILLED,
  FETCH_CATEGORY_PENDING,
  FETCH_CATEGORY_REJECTED,
  FETCH_CATEGORY_EACH_FULFILLED,
  FETCH_CATEGORY_EACH_REJECTED,
  FETCH_CATEGORY_EACH_PENDING,
  REMOVE_CATEGORY_DATA_FULFILLED,
  TOGGLE_CATEGORY_EDIT_MODAL,
  UNMOUNT_CATEGORY_DATA,
  CREATE_CATEGORY_FULFILLED,
  CREATE_CATEGORY_PENDING,
  CREATE_CATEGORY_REJECTED,
  EDIT_CATEGORY_FULFILLED,
  EDIT_CATEGORY_PENDING,
  EDIT_CATEGORY_REJECTED,
  FETCH_CATEGORY_ARRAY_PENDING,
  FETCH_CATEGORY_ARRAY_FULFILLED,
  FETCH_CATEGORY_ARRAY_REJECTED,
  RESET_CATEGORY_ERRORS,
  UNMOUNT_CATEGORY,
  FETCH_CATEGORY_DETAIL_FULFILLED,
  FETCH_CATEGORY_DETAIL_PENDING,
  FETCH_CATEGORY_DETAIL_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  fetchLoading: false,
  error: false,
  pages: 1,
  rowCount: 0,
  categories: [],
  categoryData: [],
  categoryEditModal: false,
  categoryErrors: null,
  categoryEditErrors: null,
  category: null,
  detailLoading: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_CATEGORY_ERRORS:
      return {
        ...state,
        categoryErrors: null,
        categoryEditErrors: null
      };

    case FETCH_CATEGORY_ARRAY_PENDING:
      return { ...state, fetchLoading: true };

    case FETCH_CATEGORY_ARRAY_FULFILLED:
      return {
        ...state,
        categoryData: action.payload
      };

    case FETCH_CATEGORY_ARRAY_REJECTED:
      console.log("industry each error : ", action.payload);

      return { ...state, fetchLoading: false };

    case UNMOUNT_CATEGORY:
      return { ...state, categories: [] };

    case EDIT_CATEGORY_PENDING:
      return { ...state, loading: true, error: false };

    case EDIT_CATEGORY_REJECTED:
      return {
        ...state,
        loading: false,
        error: true,
        categoryEditErrors: action.payload
      };

    case EDIT_CATEGORY_FULFILLED:
      return {
        ...state,
        loading: false,
        error: false,
        categoryEditErrors: null
      };

    case CREATE_CATEGORY_PENDING:
      return { ...state, loading: true, error: false };

    case CREATE_CATEGORY_REJECTED:
      return {
        ...state,
        loading: false,
        error: true,
        categoryErrors: action.payload
      };

    case CREATE_CATEGORY_FULFILLED:
      return {
        ...state,
        loading: false,
        error: false,
        categoryErrors: null
      };

    case FETCH_CATEGORY_DETAIL_PENDING:
      return { ...state, detailLoading: true };

    case FETCH_CATEGORY_DETAIL_FULFILLED:
      return { ...state, detailLoading: false, category: action.payload };

    case FETCH_CATEGORY_DETAIL_REJECTED:
      return { ...state, detailLoading: false };

    case FETCH_CATEGORY_PENDING:
      return { ...state, fetchLoading: true };

    case FETCH_CATEGORY_FULFILLED:
      return {
        ...state,
        categories: action.payload.data.map((category, i) => ({
          ...category,
          s_no: action.payload.rows * (action.payload.page - 1) + i + 1
        })),
        pages: action.payload.pages,
        rowCount: action.payload.rowCount,
        fetchLoading: false
      };

    case FETCH_CATEGORY_REJECTED:
      return { ...state, fetchLoading: false };

    case FETCH_CATEGORY_EACH_PENDING:
      return { ...state, loading: true };

    // case FETCH_CATEGORY_EACH_FULFILLED:
    //   console.log("category reducer: ", action);
    //   console.log("cate state: ", state);
    //   return {
    //     ...state,
    //     categoryData: state.categoryData
    //       ? [...state.categoryData, action.payload]
    //       : [action.payload],
    //     loading: false,
    //     statusClass: "fulfilled"
    //   };
    case FETCH_CATEGORY_EACH_FULFILLED:
      // console.log("category reducer: ", action);
      // console.log("cate state: ", state);
      return {
        ...state,
        categoryData: state.categoryData
          ? [...state.categoryData, action.payload]
          : [action.payload],
        loading: false
      };

    case FETCH_CATEGORY_EACH_REJECTED:
      return { ...state, loading: false };

    case REMOVE_CATEGORY_DATA_FULFILLED:
      console.log("remove categ: ", state.categoryData, action.payload);
      console.log("filterd: ", {
        ...state,
        categoryData: [
          state.categoryData.find(each => each.id !== action.payload.id)
        ]
      });
      return {
        ...state,
        categoryData: state.categoryData.filter(each => {
          console.log(
            "dude reducer: ",
            state.categoryData,
            each.id,
            action.payload.id
          );
          if (each.id === action.payload.id) {
            console.log("success if: ", false);
            return false;
          } else {
            console.log("success else: ", true);
            return true;
          }
        })
      };

    case TOGGLE_CATEGORY_EDIT_MODAL:
      console.log("cat edit: ", action);
      return {
        ...state,
        categoryEditModal: !state.categoryEditModal,
        categoryEditData: action.payload
      };

    case UNMOUNT_CATEGORY_DATA:
      return { ...state, categoryData: action.payload, loading: false };
    default:
      return state;
  }
}
