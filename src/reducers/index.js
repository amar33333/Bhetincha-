import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import WebsiteReducers from "../Website/reducers";
import EcommerceReducers from "../Website/Views/Ecommerce/reducers";

const createReducer = asyncReducers =>
  combineReducers({
    auth: AuthReducer,
    ...WebsiteReducers,
    ...asyncReducers,
    EcommerceContainer: EcommerceReducers
  });

export default createReducer;
