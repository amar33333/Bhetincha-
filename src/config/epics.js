import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import authEpics from "../actions";
import homeEpics from "../Website/config/epics";

const dependencies = {};
const epic$ = new BehaviorSubject(combineEpics(...authEpics, ...homeEpics));

const rootEpic = (action$, store) =>
  epic$.mergeMap(epic => epic(action$, store));

export const epicMiddleware = createEpicMiddleware(rootEpic, { dependencies });

// add new epic
export default (newEpic, newDependencies) => {
  // Object.assign(dependencies, newDependencies);
  epic$.next(newEpic);
};
