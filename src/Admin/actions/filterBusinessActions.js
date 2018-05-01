import {
  CLEAR_BUSINESS_NAME_SEARCH,
  BUSINESS_FILTER_ON_CHANGE,
  FETCH_BUSINESS_PENDING,
  CLEAR_BUSINESS_FILTER,
  SET_SORT_BY
} from "./types";

const epics = [];

export const handleOnBusinessFilterChange = payload => ({
  type: BUSINESS_FILTER_ON_CHANGE,
  payload
});

export const onFilterCleared = () => ({ type: CLEAR_BUSINESS_FILTER });

epics.push(action$ =>
  action$.ofType(CLEAR_BUSINESS_FILTER).mapTo({ type: FETCH_BUSINESS_PENDING })
);

export const handleSearchKeywordCleared = () => ({
  type: CLEAR_BUSINESS_NAME_SEARCH
});

epics.push(action$ =>
  action$
    .ofType(CLEAR_BUSINESS_NAME_SEARCH)
    .mapTo({ type: FETCH_BUSINESS_PENDING })
);

export const handleSortChangeBusiness = payload => ({
  type: SET_SORT_BY,
  payload
});

epics.push(action$ =>
  action$.ofType(SET_SORT_BY).mapTo({ type: FETCH_BUSINESS_PENDING })
);

export default epics;
