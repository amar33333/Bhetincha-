import { combineReducers } from "redux";

import BusinessReducer from "./businessReducer";

const createReducer = combineReducers({
  business_reducer: BusinessReducer
});

export default createReducer;
