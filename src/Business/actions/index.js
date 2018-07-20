import ecommerceEpics from "./ecommerceActions";
import exsectionEpics from "./exsectionActions";
import businessActions from "./businessActions";
import primaryAddress from "./primaryAddressActions";
import industryEpics from "./industryActions";
import categoryEpics from "./categoryActions";

export * from "./businessActions";
export * from "./industryActions";
export * from "./categoryActions";
export * from "./primaryAddressActions";
export * from "./ecommerceActions";
export * from "./exsectionActions";
export * from "./industryActions";

export default [
  ...ecommerceEpics,
  ...exsectionEpics,
  ...businessActions,
  ...primaryAddress,
  ...industryEpics,
  ...categoryEpics
];
