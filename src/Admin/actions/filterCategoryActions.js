import {
  CATEGORY_FILTER_ON_CHANGE,
  FETCH_CATEGORY_PENDING,
  CATEGORY_SET_SORT_BY
} from "./types";

const epics = [];

export const handleOnCategoryFilterChange = payload => ({
  type: CATEGORY_FILTER_ON_CHANGE,
  payload
});

epics.push(action$ =>
  action$
    .ofType(CATEGORY_FILTER_ON_CHANGE)
    .mapTo({ type: FETCH_CATEGORY_PENDING })
);

export const handleSortChangeCategory = payload => ({
  type: CATEGORY_SET_SORT_BY,
  payload
});

epics.push(action$ =>
  action$.ofType(CATEGORY_SET_SORT_BY).mapTo({ type: FETCH_CATEGORY_PENDING })
);

export default epics;
