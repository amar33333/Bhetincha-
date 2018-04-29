import industryEpics from "./industryActions";
import businessEpics from "./businessActions";

export * from "./industryActions";
export * from "./categoryActions";
export * from "./extraSectionActions";
export * from "./subCategoryActions";
export * from "./generalSetupActions";
export * from "./userActions";
export * from "./businessActions";
export * from "./filterBusinessActions";

export default [...industryEpics, ...businessEpics];
