import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import WebsiteReducers from "../Website/reducers";

const createReducer = asyncReducers =>
  combineReducers({
    auth: AuthReducer,
    ...WebsiteReducers,
    ...asyncReducers
  });

export default createReducer;
