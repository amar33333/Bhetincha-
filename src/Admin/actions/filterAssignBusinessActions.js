import {
  CLEAR_ASSIGN_BUSINESS_NAME_SEARCH,
  ASSIGN_BUSINESS_FILTER_ON_CHANGE,
  FETCH_ASSIGN_BUSINESS_PENDING,
  CLEAR_ASSIGN_BUSINESS_FILTER,
  ASSIGN_BUSINESS_SET_SORT_BY
} from "./types";

const epics = [];

export const handleOnAssignBusinessFilterChange = payload => ({
  type: ASSIGN_BUSINESS_FILTER_ON_CHANGE,
  payload
});

epics.push(action$ =>
  action$
    .ofType(ASSIGN_BUSINESS_FILTER_ON_CHANGE)
    .mapTo({ type: FETCH_ASSIGN_BUSINESS_PENDING })
);

export const onFilterClearedAssignBusiness = () => ({
  type: CLEAR_ASSIGN_BUSINESS_FILTER
});

epics.push(action$ =>
  action$
    .ofType(CLEAR_ASSIGN_BUSINESS_FILTER)
    .mapTo({ type: FETCH_ASSIGN_BUSINESS_PENDING })
);

export const handleSearchKeywordClearedAssignBusiness = () => ({
  type: CLEAR_ASSIGN_BUSINESS_NAME_SEARCH
});

epics.push(action$ =>
  action$
    .ofType(CLEAR_ASSIGN_BUSINESS_NAME_SEARCH)
    .mapTo({ type: FETCH_ASSIGN_BUSINESS_PENDING })
);

export const handleSortChangeAssignBusiness = payload => ({
  type: ASSIGN_BUSINESS_SET_SORT_BY,
  payload
});

epics.push(action$ =>
  action$
    .ofType(ASSIGN_BUSINESS_SET_SORT_BY)
    .mapTo({ type: FETCH_ASSIGN_BUSINESS_PENDING })
);

export default epics;
