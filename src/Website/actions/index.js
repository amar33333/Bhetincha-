import searchEpics from "./searchActions";
import homeEpics from "./homeActions";

export * from "./searchActions";
export * from "./homeActions";

export default [...searchEpics, ...homeEpics];
// export default [...homeEpics];
