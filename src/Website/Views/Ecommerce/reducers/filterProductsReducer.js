import {
  FETCH_ECOMMERCE_PRODUCTS_FULFILLED,
  FILTER_PARAMETERS_CHANGE_PRODUCTS_LIST,
  FETCH_ECOMMERCE_CATEGORY_CONFIG_FULFILLED,
  FILTER_PARAMETERS_CHANGE_BUSINESS_SLUG_PRODUCTS_LIST,
  CLEAR_FILTER_PARAMETERS_PRODUCTS_LIST
} from "../actions/types";

// {
//   "query":"world",
//   "categoryId": "214e56f37f454ac5b20256eef61ed13a",
//   "filters":[
//           {"name":"price","fieldType": "Float", "gte": 1000,"lte": 3000},
//           {"name":"Size","fieldType": "Choices", "data":["S"]},
//           {"name":"DateTimeFilterable", "fieldType":"DateTime", "gte":"2018-06-01T07:34:14.434Z","lte":"2018-07-03T07:34:14.434Z"}
//       ],
//   "sortby":"name",
//   "desc":true
// }
const INITIAL_STATE = {
  frm: 0,
  size: 20,
  query: "",
  filters: [],
  sortby: null,
  desc: false,
  businessSlug: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FILTER_PARAMETERS_CHANGE_PRODUCTS_LIST:
      return { ...state, ...action.payload };

    case FETCH_ECOMMERCE_CATEGORY_CONFIG_FULFILLED:
      return { ...state, filters: [] };

    case FILTER_PARAMETERS_CHANGE_BUSINESS_SLUG_PRODUCTS_LIST:
      return { ...state, businessSlug: action.payload };

    case CLEAR_FILTER_PARAMETERS_PRODUCTS_LIST:
      return { ...INITIAL_STATE };

    // case FETCH_ECOMMERCE_PRODUCTS_FULFILLED:
    //   return {
    //     ...state
    //   };

    default:
      return state;
  }
}
