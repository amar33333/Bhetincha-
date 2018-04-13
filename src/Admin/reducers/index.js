import { combineReducers } from "redux";
import IndustryReducer from "./industryReducer";
import SubCategoryReducer from "./subCategoryReducer";
import CategoryReducer from "./categoryReducer";
import ExtraSectionReducer from "./extraSectionReducer";
import generalSetupReducer from "./generalSetupReducer";

const createReducer = combineReducers({
  industries: IndustryReducer,
  categories: CategoryReducer,
  sub_categories: SubCategoryReducer,
  extra_sections: ExtraSectionReducer,
  general_setup: generalSetupReducer
});

export default createReducer;
