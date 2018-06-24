import {
  STATE_FILTER_ON_CHANGE,
  FETCH_STATE_PENDING,
  STATE_SET_SORT_BY
} from "./types";

const epics = [];

export const handleOnStateFilterChange = payload => ({
  type: STATE_FILTER_ON_CHANGE,
  payload
});

epics.push(action$ =>
  action$.ofType(STATE_FILTER_ON_CHANGE).mapTo({ type: FETCH_STATE_PENDING })
);

export const handleSortChangeState = payload => ({
  type: STATE_SET_SORT_BY,
  payload
});

epics.push(action$ =>
  action$.ofType(STATE_SET_SORT_BY).mapTo({ type: FETCH_STATE_PENDING })
);

export default epics;
