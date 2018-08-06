import testEpics from "./testActions";
import personalDetailsEpics from "./personalDetailsActions";

export * from "./personalDetailsActions";

export default [...testEpics, ...personalDetailsEpics];
