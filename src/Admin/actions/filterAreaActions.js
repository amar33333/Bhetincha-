import {
  AREA_FILTER_ON_CHANGE,
  FETCH_AREA_PENDING,
  AREA_SET_SORT_BY,
  FETCH_CITY_AUTOCOMPLETE_PENDING
} from "./types";

const epics = [];

export const handleOnAreaFilterChange = payload => ({
  type: AREA_FILTER_ON_CHANGE,
  payload
});

epics.push(action$ =>
  action$
    .ofType(AREA_FILTER_ON_CHANGE)
    .concatMapTo([
      { type: FETCH_AREA_PENDING },
      { type: FETCH_CITY_AUTOCOMPLETE_PENDING }
    ])
);

export const handleSortChangeArea = payload => ({
  type: AREA_SET_SORT_BY,
  payload
});

epics.push(action$ =>
  action$.ofType(AREA_SET_SORT_BY).mapTo({ type: FETCH_AREA_PENDING })
);

export default epics;
