import { combineEpics } from "redux-observable";

import * as home from "./homeEpics";

export default combineEpics(...Object.values(home));
