import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import SearchReducer from "./searchReducer";

const createReducer = asyncReducers =>
  combineReducers({
    auth: AuthReducer,
    search_result: SearchReducer,
    ...asyncReducers
  });

export default createReducer;
