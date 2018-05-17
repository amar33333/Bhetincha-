import { combineReducers } from "redux";
import IndustryReducer from "./industryReducer";
import SubCategoryReducer from "./subCategoryReducer";
import CategoryReducer from "./categoryReducer";
import ExtraSectionReducer from "./extraSectionReducer";
import generalSetupReducer from "./generalSetupReducer";
import userReducer from "./userReducer";
import BusinessReducer from "./businessReducer";
import filterBusiness from "./filterBusinessReducer";
import filterCity from "./filterCityReducer";
import filterArea from "./filterAreaReducer";

const createReducer = combineReducers({
  industries: IndustryReducer,
  categories: CategoryReducer,
  sub_categories: SubCategoryReducer,
  extra_sections: ExtraSectionReducer,
  general_setup: generalSetupReducer,
  user_reducer: userReducer,
  business_reducer: BusinessReducer,
  filterBusiness,
  filterCity,
  filterArea
});

export default createReducer;
