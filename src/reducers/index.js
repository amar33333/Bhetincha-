import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import IndustryReducer from "./industryReducer";
import CategoryReducer from "./categoryReducer";
import ExtraSectionReducer from "./extraSectionReducer";
import SearchReducer from "./searchReducer";

// const rootReducer = combineReducers({
//   auth: AuthReducer,
//   industries: IndustryReducer,
//   categories: CategoryReducer,
//   extra_sections: ExtraSectionReducer,
//   search_result: SearchReducer
// });

const createReducer = asyncReducers =>
  combineReducers({
    auth: AuthReducer,
    industries: IndustryReducer,
    categories: CategoryReducer,
    extra_sections: ExtraSectionReducer,
    search_result: SearchReducer,
    ...asyncReducers
  });

export default createReducer;
