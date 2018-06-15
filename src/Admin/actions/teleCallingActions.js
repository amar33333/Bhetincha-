import { Observable } from "rxjs/Observable";

import {
  FETCH_BUSINESS_TELE_CALLING_FULFILLED,
  FETCH_BUSINESS_TELE_CALLING_PENDING,
  FETCH_BUSINESS_TELE_CALLING_REJECTED
} from "./types";

import { onBusinessTeleCallingGetAjax } from "../config/adminServerCall";

const epics = [];

export const onBusinessTeleCallingList = payload => ({
  type: FETCH_BUSINESS_TELE_CALLING_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_BUSINESS_TELE_CALLING_PENDING).mergeMap(action =>
    onBusinessTeleCallingGetAjax({
      access_token: getState().auth.cookies.token_data.access_token,
      ...action.payload
    })
      .map(({ response }) => ({
        type: FETCH_BUSINESS_TELE_CALLING_FULFILLED,
        payload: response.hits.hits
      }))
      .catch(ajaxError =>
        Observable.of({ type: FETCH_BUSINESS_TELE_CALLING_REJECTED })
      )
  )
);

export default epics;
