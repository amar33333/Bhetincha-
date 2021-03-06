import { combineReducers } from "redux";
import IndustryReducer from "./industryReducer";
import SubCategoryReducer from "./subCategoryReducer";
import CategoryReducer from "./categoryReducer";
import ExtraSectionReducer from "./extraSectionReducer";
import generalSetupReducer from "./generalSetupReducer";
import userReducer from "./userReducer";
import BusinessReducer from "./businessReducer";
import filterBusiness from "./filterBusinessReducer";
import filterState from "./filterStateReducer";
import filterDistrict from "./filterDistrictReducer";
import filterCity from "./filterCityReducer";
import filterArea from "./filterAreaReducer";
import filterCategory from "./filterCategoryReducer";
import filterSubCategory from "./filterSubCategoryReducer";
import filterAppBusiness from "./filterAppBusinessReducer";
import filterAssignBusiness from "./filterAssignBusinessReducer";
import filterUsers from "./filterUsersReducer";
import tele_calling from "./teleCallingReducer";
import location from "./locationReducer";
import ecommerce from "./ecommerceReducer";
import settings from "./settingsReducer";
import filterImproveListing from "./filterImproveListingReducer";
import exsection from "./exsectionReducer";

const createReducer = combineReducers({
  industries: IndustryReducer,
  categories: CategoryReducer,
  sub_categories: SubCategoryReducer,
  extra_sections: ExtraSectionReducer,
  general_setup: generalSetupReducer,
  user_reducer: userReducer,
  business_reducer: BusinessReducer,
  settings,
  filterBusiness,
  filterState,
  filterDistrict,
  filterCity,
  filterArea,
  filterCategory,
  filterSubCategory,
  filterAppBusiness,
  filterAssignBusiness,
  filterUsers,
  tele_calling,
  location,
  ecommerce,
  filterImproveListing,
  exsection
});

export default createReducer;
