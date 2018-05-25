import {
  CLEAR_APP_BUSINESS_NAME_SEARCH,
  APP_BUSINESS_FILTER_ON_CHANGE,
  FETCH_APP_BUSINESS_PENDING,
  CLEAR_APP_BUSINESS_FILTER,
  APP_BUSINESS_SET_SORT_BY
} from "./types";

const epics = [];

export const handleOnAppBusinessFilterChange = payload => ({
  type: APP_BUSINESS_FILTER_ON_CHANGE,
  payload
});

export const onFilterClearedAppBusiness = () => ({
  type: CLEAR_APP_BUSINESS_FILTER
});

epics.push(action$ =>
  action$
    .ofType(CLEAR_APP_BUSINESS_FILTER)
    .mapTo({ type: FETCH_APP_BUSINESS_PENDING })
);

export const handleSearchKeywordClearedAppBusiness = () => ({
  type: CLEAR_APP_BUSINESS_NAME_SEARCH
});

epics.push(action$ =>
  action$
    .ofType(CLEAR_APP_BUSINESS_NAME_SEARCH)
    .mapTo({ type: FETCH_APP_BUSINESS_PENDING })
);

export const handleSortChangeAppBusiness = payload => ({
  type: APP_BUSINESS_SET_SORT_BY,
  payload
});

epics.push(action$ =>
  action$
    .ofType(APP_BUSINESS_SET_SORT_BY)
    .mapTo({ type: FETCH_APP_BUSINESS_PENDING })
);

export default epics;
