import { combineReducers } from "redux";
import home from "./homeReducer";
import filterProducts from "./filterProductsReducer";
import productDetail from "./productReducer";

export default combineReducers({
  home,
  filterProducts,
  productDetail
});
