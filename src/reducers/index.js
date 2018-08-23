import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import WebsiteReducers from "../Website/reducers";
import EcommerceReducers from "../Website/Views/Ecommerce/reducers";
import SectionReducer from "../Website/Views/Minisite/components/Sections/reducer";
const createReducer = asyncReducers =>
  combineReducers({
    auth: AuthReducer,
    ...WebsiteReducers,
    ...asyncReducers,
    EcommerceContainer: EcommerceReducers,
    SectionContainer: SectionReducer
  });

export default createReducer;
