import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import * as auth from "./authEpics";
import homeEpics from "../Website/epics";

const dependencies = {};
const epic$ = new BehaviorSubject(
  combineEpics(...Object.values(auth), homeEpics)
);

const rootEpic = (action$, store) =>
  epic$.mergeMap(epic => epic(action$, store));

export const epicMiddleware = createEpicMiddleware(rootEpic, { dependencies });

// add new epic
export default (newEpic, newDependencies) => {
  // Object.assign(dependencies, newDependencies);
  epic$.next(newEpic);
};
