import { Observable } from "rxjs/Observable";

import {
  onIndustryPost,
  onIndustryGet,
  onIndustryEachGet,
  onIndustryPostAjax,
  onIndustryGetAjax,
  onIndustryEachGetAjax,
  onIndustryEachDeleteAjax
} from "../config/adminServerCall";

import {
  CREATE_INDUSTRY_FULFILLED,
  CREATE_INDUSTRY_REJECTED,
  CREATE_INDUSTRY_PENDING,
  FETCH_INDUSTRY_FULFILLED,
  FETCH_INDUSTRY_REJECTED,
  FETCH_INDUSTRY_PENDING,
  FETCH_INDUSTRY_EACH_FULFILLED,
  FETCH_INDUSTRY_EACH_REJECTED,
  FETCH_INDUSTRY_EACH_PENDING,
  DELETE_INDUSTRY_PENDING,
  DELETE_INDUSTRY_FULFILLED,
  DELETE_INDUSTRY_REJECTED,
  UNMOUNT_INDUSTRY
} from "./types";

const epics = [];

export const onIndustrySubmit = payload => ({
  type: CREATE_INDUSTRY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_INDUSTRY_PENDING).mergeMap(({ payload }) => {
    const { industry } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onIndustryPostAjax({ industry, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success")
          return [
            { type: CREATE_INDUSTRY_FULFILLED },
            { type: FETCH_INDUSTRY_PENDING }
          ];
        else {
          throw new Error("Message is not success");
        }
      })
      .catch(ajaxError =>
        Observable.of({ type: CREATE_INDUSTRY_REJECTED, payload: ajaxError })
      );
  })
);

export const onIndustryList = () => ({ type: FETCH_INDUSTRY_PENDING });

epics.push((action$, { getState }) =>
  action$
    .ofType(FETCH_INDUSTRY_PENDING)
    .mergeMap(action =>
      onIndustryGetAjax({
        access_token: getState().auth.cookies.token_data.access_token
      })
    )
    .map(({ response }) => ({
      type: FETCH_INDUSTRY_FULFILLED,
      payload: response
    }))
    .catch(ajaxError => Observable.of({ type: FETCH_INDUSTRY_REJECTED }))
);

export const onIndustryDelete = payload => ({
  type: DELETE_INDUSTRY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$
    .ofType(DELETE_INDUSTRY_PENDING)
    .mergeMap(({ payload }) =>
      onIndustryEachDeleteAjax({
        id: payload.id,
        access_token: getState().auth.cookies.token_data.access_token
      })
    )
    .concatMap(() => [
      { type: FETCH_INDUSTRY_PENDING },
      { type: DELETE_INDUSTRY_FULFILLED }
    ])
    .catch(ajaxError => Observable.of({ type: DELETE_INDUSTRY_REJECTED }))
);

export const onIndustryEachList = ({ id, access_token }) => dispatch => {
  onIndustryEachGet({ id, access_token })
    .then(response =>
      dispatch({ type: FETCH_INDUSTRY_EACH_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: FETCH_INDUSTRY_EACH_REJECTED, payload: error })
    );

  dispatch({ type: FETCH_INDUSTRY_EACH_PENDING });
};

export const onUnmountIndustry = () => ({
  type: UNMOUNT_INDUSTRY,
  payload: null
});

export default epics;
