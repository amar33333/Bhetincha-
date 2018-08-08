import { combineReducers } from "redux";

import BusinessReducer from "./businessReducer";
import Industry from "./industryReducer";
import Category from "./categoryReducer";
import PrimaryAddress from "./primaryAddressReducer";
import ecommerce from "./ecommerceReducer";
import exsection from "./exsectionReducer";
import coremember from "./coreMemeberReducer";

const createReducer = combineReducers({
  business_reducer: BusinessReducer,
  industries: Industry,
  categories: Category,
  primary_address: PrimaryAddress,
  ecommerce,
  exsection,
  coremember
});

export default createReducer;
