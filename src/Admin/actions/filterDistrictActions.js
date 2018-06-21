import {
  DISTRICT_FILTER_ON_CHANGE,
  FETCH_DISTRICT_PENDING,
  DISTRICT_SET_SORT_BY
} from "./types";

const epics = [];

export const handleOnDistrictFilterChange = payload => ({
  type: DISTRICT_FILTER_ON_CHANGE,
  payload
});

epics.push(action$ =>
  action$
    .ofType(DISTRICT_FILTER_ON_CHANGE)
    .mapTo({ type: FETCH_DISTRICT_PENDING })
);

export const handleSortChangeDistrict = payload => ({
  type: DISTRICT_SET_SORT_BY,
  payload
});

epics.push(action$ =>
  action$.ofType(DISTRICT_SET_SORT_BY).mapTo({ type: FETCH_DISTRICT_PENDING })
);

export default epics;
