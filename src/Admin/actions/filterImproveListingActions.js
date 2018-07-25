import {
  IMPROVE_LISTING_FILTER_ON_CHANGE,
  FETCH_IMPROVE_LISTING_PENDING,
  IMPROVE_LISTING_SET_SORT_BY
} from "./types";

const epics = [];

export const handleOnImproveListingFilterChange = payload => ({
  type: IMPROVE_LISTING_FILTER_ON_CHANGE,
  payload
});

epics.push(action$ =>
  action$
    .ofType(IMPROVE_LISTING_FILTER_ON_CHANGE)
    .mapTo({ type: FETCH_IMPROVE_LISTING_PENDING })
);

export const handleSortChangeImproveListing = payload => ({
  type: IMPROVE_LISTING_SET_SORT_BY,
  payload
});

epics.push(action$ =>
  action$
    .ofType(IMPROVE_LISTING_SET_SORT_BY)
    .mapTo({ type: FETCH_IMPROVE_LISTING_PENDING })
);

export default epics;
