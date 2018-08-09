import { Observable } from "rxjs/Observable";
import { onSearch, onSearchResultsGet } from "../config/websiteServerCall";

import {
  SEARCH_QUERY,
  SEARCH_QUERY_PENDING,
  SEARCH_QUERY_FULFILLED,
  SEARCH_QUERY_REJECTED,
  SEARCH_RESULTS_PAGE_FULFILLED,
  SEARCH_RESULTS_PAGE_PENDING,
  SEARCH_RESULTS_PAGE_REJECTED
} from "./types";

const epics = [];

export const onSearchQuerySubmit = payload => ({
  type: SEARCH_QUERY,
  payload
});

epics.push(action$ =>
  action$
    .ofType(SEARCH_QUERY)
    .debounceTime(250)
    .switchMap(action =>
      onSearch(action.payload)
        .map(({ response }) => ({
          type: SEARCH_QUERY_FULFILLED,
          payload: response
        }))
        .catch(ajaxError => Observable.of({ type: SEARCH_QUERY_REJECTED }))
        .startWith({ type: SEARCH_QUERY_PENDING })
    )
);

export const onSearchResultsList = payload => ({
  type: SEARCH_RESULTS_PAGE_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(SEARCH_RESULTS_PAGE_PENDING).mergeMap(action => {
    return onSearchResultsGet({ ...action.payload })
      .map(({ response }) => ({
        type: SEARCH_RESULTS_PAGE_FULFILLED,
        payload: response
      }))
      .catch(ajaxError =>
        Observable.of({ type: SEARCH_RESULTS_PAGE_REJECTED })
      );
  })
);

export default epics;
