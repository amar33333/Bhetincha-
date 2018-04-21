import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import homeEpics from "./homeEpics";

const dependencies = {};
const epic$ = new BehaviorSubject(combineEpics(...homeEpics));

const rootEpic = (action$, store) =>
  epic$.mergeMap(epic => epic(action$, store));

export const epicMiddleware = createEpicMiddleware(rootEpic, { dependencies });

export default (newEpic, newDependencies) => {
  // Object.assign(dependencies, newDependencies);
  newEpic.forEach(epic => epic$.next(epic));
};
