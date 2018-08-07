import industryEpics from "./industryActions";
import businessEpics from "./businessActions";
import filterBusinessEpics from "./filterBusinessActions";
import categoryEpics from "./categoryActions";
import subCategoryEpics from "./subCategoryActions";
import generalSetupEpics from "./generalSetupActions";
import filterUsersEpics from "./filterUsersActions";
import filterStateEpics from "./filterStateActions";
import filterDistrictEpics from "./filterDistrictActions";
import filterCityEpics from "./filterCityActions";
import filterAreaEpics from "./filterAreaActions";
import filterCategoryEpics from "./filterCategoryActions";
import filterSubCategoryEpics from "./filterSubCategoryActions";
import extraSectionEpics from "./extraSectionActions";
import userEpics from "./userActions";
import filterAppBusinessEpics from "./filterAppBusinessActions";
import filterAssignBusinessEpics from "./filterAssignBusinessActions";
import teleCallingEpics from "./teleCallingActions";
import locationEpics from "./locationActions";
import ecommerceEpics from "./ecommerceActions";
import exsectionEpics from "./exsectionActions";
import settingsEpics from "./settingsActions";
import filterImproveListingEpics from "./filterImproveListingActions";

export * from "./industryActions";
export * from "./categoryActions";
export * from "./extraSectionActions";
export * from "./subCategoryActions";
export * from "./generalSetupActions";
export * from "./userActions";
export * from "./businessActions";
export * from "./filterUsersActions";
export * from "./filterBusinessActions";
export * from "./filterStateActions";
export * from "./filterDistrictActions";
export * from "./filterCityActions";
export * from "./filterAreaActions";
export * from "./filterCategoryActions";
export * from "./filterSubCategoryActions";
export * from "./userActions";
export * from "./filterAppBusinessActions";
export * from "./filterAssignBusinessActions";
export * from "./teleCallingActions";
export * from "./locationActions";
export * from "./ecommerceActions";
export * from "./settingsActions";
export * from "./filterImproveListingActions";
export * from "./exsectionActions";

export default [
  ...industryEpics,
  ...businessEpics,
  ...filterBusinessEpics,
  ...categoryEpics,
  ...subCategoryEpics,
  ...generalSetupEpics,
  ...filterUsersEpics,
  ...filterStateEpics,
  ...filterDistrictEpics,
  ...filterCityEpics,
  ...filterAreaEpics,
  ...filterCategoryEpics,
  ...filterSubCategoryEpics,
  ...extraSectionEpics,
  ...userEpics,
  ...filterAppBusinessEpics,
  ...filterAssignBusinessEpics,
  ...teleCallingEpics,
  ...locationEpics,
  ...ecommerceEpics,
  ...settingsEpics,
  ...filterImproveListingEpics,
  ...exsectionEpics
];
