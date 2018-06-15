import { Observable } from "rxjs/Observable";

import {
  FETCH_LOCATION_FULFILLED,
  FETCH_LOCATION_PENDING,
  FETCH_LOCATION_REJECTED
} from "./types";

import { onLocationGetAjax } from "../config/adminServerCall";

const epics = [];

export const onLocationsList = payload => ({
  type: FETCH_LOCATION_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_LOCATION_PENDING).mergeMap(action =>
    onLocationGetAjax({
      access_token: getState().auth.cookies.token_data.access_token,
      ...action.payload
    })
      .map(({ response }) => ({
        type: FETCH_LOCATION_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_LOCATION_REJECTED }))
  )
);

export default epics;
