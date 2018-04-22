import { onSearch } from "../config/websiteServerCall";

import {
  SEARCH_QUERY_PENDING,
  SEARCH_QUERY_FULFILLED,
  SEARCH_QUERY_REJECTED
} from "./types";

export const onSearchQuerySubmit = ({ query }) => dispatch => {
  onSearch({ query })
    .then(searchResponse => {
      console.log("searchreaspo: ", searchResponse);
      dispatch({
        type: SEARCH_QUERY_FULFILLED,
        payload: searchResponse.data
      });
    })
    .catch(searchError => {
      console.log("search eeror: ", searchError);

      dispatch({ type: SEARCH_QUERY_REJECTED, payload: searchError });
    });

  dispatch({ type: SEARCH_QUERY_PENDING });
};
