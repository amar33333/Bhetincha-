import {
  CITY_FILTER_ON_CHANGE,
  FETCH_CITY_PENDING,
  CITY_SET_SORT_BY
} from "./types";

const epics = [];

export const handleOnCityFilterChange = payload => ({
  type: CITY_FILTER_ON_CHANGE,
  payload
});

epics.push(action$ =>
  action$.ofType(CITY_FILTER_ON_CHANGE).mapTo({ type: FETCH_CITY_PENDING })
);

export const handleSortChangeCity = payload => ({
  type: CITY_SET_SORT_BY,
  payload
});

epics.push(action$ =>
  action$.ofType(CITY_SET_SORT_BY).mapTo({ type: FETCH_CITY_PENDING })
);

export default epics;
