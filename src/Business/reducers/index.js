import { combineReducers } from "redux";

import BusinessReducer from "./businessReducer";
import Industry from "./industryReducer";
import Category from "./categoryReducer";
import PrimaryAddress from "./primaryAddressReducer";

const createReducer = combineReducers({
  business_reducer: BusinessReducer,
  industries: Industry,
  categories: Category,
  primary_address: PrimaryAddress
});

export default createReducer;
