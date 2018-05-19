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
  UNMOUNT_CATEGORY
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  fetchLoading: false,
  error: false,
  categories: [],
  categoryData: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UNMOUNT_CATEGORY:
      return { ...state, categories: [] };

    case CREATE_CATEGORY_PENDING:
      return { ...state, loading: true, error: false };

    case CREATE_CATEGORY_REJECTED:
      return { ...state, loading: false, error: true };

    case CREATE_CATEGORY_FULFILLED:
      return { ...state, loading: false, error: false };

    case FETCH_CATEGORY_PENDING:
      return { ...state, fetchLoading: true };

    case FETCH_CATEGORY_FULFILLED:
      return {
        ...state,
        categories: action.payload.map((category, i) => ({
          ...category,
          s_no: i + 1
        })),
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
