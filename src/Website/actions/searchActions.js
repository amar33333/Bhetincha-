import { Observable } from "rxjs/Observable";
import { onSearch } from "../config/websiteServerCall";

import {
  SEARCH_QUERY,
  SEARCH_QUERY_PENDING,
  SEARCH_QUERY_FULFILLED,
  SEARCH_QUERY_REJECTED
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
          payload: response.hits
        }))
        .catch(ajaxError => Observable.of({ type: SEARCH_QUERY_REJECTED }))
        .startWith({ type: SEARCH_QUERY_PENDING })
    )
);

export default epics;
