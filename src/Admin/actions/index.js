import industryEpics from "./industryActions";
import businessEpics from "./businessActions";
import filterBusinessEpics from "./filterBusinessActions";
import categoryEpics from "./categoryActions";
import subCategoryEpics from "./subCategoryActions";
import generalSetupEpics from "./generalSetupActions";
import filterCityEpics from "./filterCityActions";

export * from "./industryActions";
export * from "./categoryActions";
export * from "./extraSectionActions";
export * from "./subCategoryActions";
export * from "./generalSetupActions";
export * from "./userActions";
export * from "./businessActions";
export * from "./filterBusinessActions";
export * from "./filterCityActions";

export default [
  ...industryEpics,
  ...businessEpics,
  ...filterBusinessEpics,
  ...categoryEpics,
  ...subCategoryEpics,
  ...generalSetupEpics,
  ...filterCityEpics
];
