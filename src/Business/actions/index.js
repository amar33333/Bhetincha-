import ecommerceEpics from "./ecommerceActions";
import businessActions from "./businessActions";
import primaryAddress from "./primaryAddressActions";
import industryEpics from "./industryActions";
import categoryEpics from "./categoryActions";
import exsectionEpics from "./exsectionActions";

export * from "./businessActions";
export * from "./categoryActions";
export * from "./primaryAddressActions";
export * from "./ecommerceActions";
export * from "./industryActions";
export * from "./exsectionActions";

export default [
  ...ecommerceEpics,
  ...exsectionEpics,
  ...businessActions,
  ...primaryAddress,
  ...industryEpics,
  ...categoryEpics
];
