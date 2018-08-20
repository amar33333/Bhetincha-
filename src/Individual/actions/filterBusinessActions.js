import { BUSINESS_FILTER_ON_CHANGE, FETCH_BUSINESS_PENDING } from "./types";

const epics = [];

export const handleOnBusinessFilterChange = payload => ({
  type: BUSINESS_FILTER_ON_CHANGE,
  payload
});

epics.push(action$ =>
  action$
    .ofType(BUSINESS_FILTER_ON_CHANGE)
    .mapTo({ type: FETCH_BUSINESS_PENDING })
);

export default epics;
