import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import IndustryReducer from "./industryReducer";
import CategoryReducer from "./categoryReducer";
import ExtraSectionReducer from "./extraSectionReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  industries: IndustryReducer,
  categories: CategoryReducer,
  extra_sections: ExtraSectionReducer
});

export default rootReducer;
