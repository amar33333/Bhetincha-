import {
  SUB_CATEGORY_FILTER_ON_CHANGE,
  FETCH_SUB_CATEGORY_PENDING,
  SUB_CATEGORY_SET_SORT_BY
} from "./types";

const epics = [];

export const handleOnSubCategoryFilterChange = payload => ({
  type: SUB_CATEGORY_FILTER_ON_CHANGE,
  payload
});

epics.push(action$ =>
  action$
    .ofType(SUB_CATEGORY_FILTER_ON_CHANGE)
    .mapTo({ type: FETCH_SUB_CATEGORY_PENDING })
);

export const handleSortChangeSubCategory = payload => ({
  type: SUB_CATEGORY_SET_SORT_BY,
  payload
});

epics.push(action$ =>
  action$
    .ofType(SUB_CATEGORY_SET_SORT_BY)
    .mapTo({ type: FETCH_SUB_CATEGORY_PENDING })
);

export default epics;
