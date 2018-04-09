import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import IndustryReducer from "./industryReducer";
import CategoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  industry: IndustryReducer,
  category: CategoryReducer
});

export default rootReducer;
