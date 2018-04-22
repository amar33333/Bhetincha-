import { combineReducers } from "redux";

import BusinessReducer from "./businessReducer";
import Industry from "./industryReducer";
import Category from "./categoryReducer";
import PrimaryAddress from "./primaryAddressReducer";

const createReducer = combineReducers({
  business_reducer: BusinessReducer,
  industry_reducer: Industry,
  category_reducer: Category,
  primary_address: PrimaryAddress
});

export default createReducer;
