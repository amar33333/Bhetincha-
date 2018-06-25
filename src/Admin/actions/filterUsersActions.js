import {
  USERS_FILTER_ON_CHANGE,
  FETCH_USERS_PENDING,
  USERS_SET_SORT_BY
} from "./types";

const epics = [];

export const handleOnUsersFilterChange = payload => ({
  type: USERS_FILTER_ON_CHANGE,
  payload
});

epics.push(action$ =>
  action$.ofType(USERS_FILTER_ON_CHANGE).mapTo({ type: FETCH_USERS_PENDING })
);

export const handleSortChangeUsers = payload => ({
  type: USERS_SET_SORT_BY,
  payload
});

epics.push(action$ =>
  action$.ofType(USERS_SET_SORT_BY).mapTo({ type: FETCH_USERS_PENDING })
);

export default epics;
