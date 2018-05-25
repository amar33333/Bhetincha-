import { Observable } from "rxjs/Observable";

import { onExtraSectionGetAjax } from "../config/adminServerCall";
import {
  FETCH_EXTRA_SECTION_FULFILLED,
  FETCH_EXTRA_SECTION_REJECTED,
  FETCH_EXTRA_SECTION_PENDING,
  UNMOUNT_EXTRA_SECTION
} from "./types";

const epics = [];

export const onExtraSectionList = () => ({ type: FETCH_EXTRA_SECTION_PENDING });

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_EXTRA_SECTION_PENDING).mergeMap(action =>
    onExtraSectionGetAjax({
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_EXTRA_SECTION_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_EXTRA_SECTION_REJECTED }))
  )
);

export const onUnmountExtraSection = () => ({
  type: UNMOUNT_EXTRA_SECTION,
  payload: null
});

export default epics;
