import { combineReducers } from "redux";
import home from "./homeReducer";
import filterProducts from "./filterProductsReducer";

export default combineReducers({
  home,
  filterProducts
});
