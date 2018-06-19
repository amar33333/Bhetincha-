import industryEpics from "./industryActions";
import businessEpics from "./businessActions";
import filterBusinessEpics from "./filterBusinessActions";
import categoryEpics from "./categoryActions";
import subCategoryEpics from "./subCategoryActions";
import generalSetupEpics from "./generalSetupActions";
import filterCityEpics from "./filterCityActions";
import filterAreaEpics from "./filterAreaActions";
import extraSectionEpics from "./extraSectionActions";
import userEpics from "./userActions";
import filterAppBusinessEpics from "./filterAppBusinessActions";
import filterAssignBusinessEpics from "./filterAssignBusinessActions";
import teleCallingEpics from "./teleCallingActions";
import locationEpics from "./locationActions";
import ecommerceEpics from "./ecommerceActions";

export * from "./industryActions";
export * from "./categoryActions";
export * from "./extraSectionActions";
export * from "./subCategoryActions";
export * from "./generalSetupActions";
export * from "./userActions";
export * from "./businessActions";
export * from "./filterBusinessActions";
export * from "./filterCityActions";
export * from "./filterAreaActions";
export * from "./userActions";
export * from "./filterAppBusinessActions";
export * from "./filterAssignBusinessActions";
export * from "./teleCallingActions";
export * from "./locationActions";
export * from "./ecommerceActions";

export default [
  ...industryEpics,
  ...businessEpics,
  ...filterBusinessEpics,
  ...categoryEpics,
  ...subCategoryEpics,
  ...generalSetupEpics,
  ...filterCityEpics,
  ...filterAreaEpics,
  ...extraSectionEpics,
  ...userEpics,
  ...filterAppBusinessEpics,
  ...filterAssignBusinessEpics,
  ...teleCallingEpics,
  ...locationEpics,
  ...ecommerceEpics
];
