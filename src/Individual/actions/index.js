import testEpics from "./testActions";
import personalDetailsEpics from "./personalDetailsActions";
import interestsEpics from "./interestsActions";
import experienceEpics from "./experienceActions";
import educationEpics from "./educationActions";
import filterBusinessEpics from "./filterBusinessActions";

export * from "./personalDetailsActions";
export * from "./interestsActions";
export * from "./experienceActions";
export * from "./educationActions";
export * from "./filterBusinessActions";

export default [
  ...testEpics,
  ...personalDetailsEpics,
  ...interestsEpics,
  ...filterBusinessEpics,
  ...educationEpics,
  ...experienceEpics
];
