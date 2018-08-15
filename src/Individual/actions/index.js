import testEpics from "./testActions";
import personalDetailsEpics from "./personalDetailsActions";
import interestsEpics from "./interestsActions";

export * from "./personalDetailsActions";
export * from "./interestsActions";

export default [...testEpics, ...personalDetailsEpics, ...interestsEpics];
