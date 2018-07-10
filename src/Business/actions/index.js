import ecommerceEpics from "./ecommerceActions";
import businessActions from "./businessActions";
import primaryAddress from "./primaryAddressActions";
import industryEpics from "./industryActions";

export * from "./businessActions";
export * from "./industryActions";
export * from "./categoryActions";
export * from "./primaryAddressActions";
export * from "./ecommerceActions";
export * from "./industryActions";

export default [
  ...ecommerceEpics,
  ...businessActions,
  ...primaryAddress,
  ...industryEpics
];
