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
    .map(action => ({ type: SEARCH_QUERY_PENDING, payload: action.payload }))
);

epics.push(action$ =>
  action$
    .ofType(SEARCH_QUERY_PENDING)
    .mergeMap(action => onSearch(action.payload))
    .map(({ response }) => ({
      type: SEARCH_QUERY_FULFILLED,
      payload: response.hits
    }))
    .catch(ajaxError => Observable.of({ type: SEARCH_QUERY_REJECTED }))
);

// dispatch => {
//   onSearch({ query })
//     .then(searchResponse => {
//       console.log("searchreaspo: ", searchResponse);
//       dispatch({
//         type: SEARCH_QUERY_FULFILLED,
//         payload: searchResponse.data
//       });
//     })
//     .catch(searchError => {
//       console.log("search eeror: ", searchError);

//       dispatch({ type: SEARCH_QUERY_REJECTED, payload: searchError });
//     });

//   dispatch({ type: SEARCH_QUERY_PENDING });
// };
// //

export default epics;
