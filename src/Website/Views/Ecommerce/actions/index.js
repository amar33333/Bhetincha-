import homeEpics from "./homeActions";
import productEpics from "./productActions";

export * from "./homeActions";
export * from "./productActions";

export default [...homeEpics, ...productEpics];
