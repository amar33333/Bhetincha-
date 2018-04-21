import { combineEpics } from "redux-observable";

import * as dashboard from "./dashboardEpics";

export default combineEpics(...Object.values(dashboard));
