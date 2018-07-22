import homeEpics from "./homeActions";
import productEpics from "./productActions";
import filterProductsEpics from "./filterProductsActions";

export * from "./homeActions";
export * from "./productActions";
export * from "./filterProductsActions";

export default [...homeEpics, ...productEpics, ...filterProductsEpics];
