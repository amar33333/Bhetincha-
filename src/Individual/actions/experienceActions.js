import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import { onBusinessAllGetAjax } from "../../Business/config/businessServerCall";
import { onIndustryGetAjax } from "../../Admin/config/adminServerCall";
import {
  onExperienceDetailsGet,
  onExperienceDetailsPost,
  onExperienceDetailDelete,
  onExperienceDetailPut,
  onExperienceDetailGet
} from "../config/individualServerCall";

import {
  FETCH_BUSINESS_FULFILLED,
  FETCH_BUSINESS_REJECTED,
  FETCH_BUSINESS_PENDING,
  FETCH_INDUSTRY_FULFILLED,
  FETCH_INDUSTRY_PENDING,
  FETCH_INDUSTRY_REJECTED,
  ADD_EXPERIENCE_FULFILLED,
  ADD_EXPERIENCE_PENDING,
  ADD_EXPERIENCE_REJECTED,
  FETCH_EXPERIENCE_FULFILLED,
  FETCH_EXPERIENCE_PENDING,
  FETCH_EXPERIENCE_REJECTED,
  EDIT_EXPERIENCE_FULFILLED,
  EDIT_EXPERIENCE_PENDING,
  EDIT_EXPERIENCE_REJECTED,
  FETCH_EXPERIENCE_EACH_FULFILLED,
  FETCH_EXPERIENCE_EACH_PENDING,
  FETCH_EXPERIENCE_EACH_REJECTED,
  DELETE_EXPERIENCE_FULFILLED,
  DELETE_EXPERIENCE_PENDING,
  DELETE_EXPERIENCE_REJECTED
} from "./types";

const epics = [];

export const onExperienceDetailList = payload => ({
  type: FETCH_EXPERIENCE_EACH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_EXPERIENCE_EACH_PENDING).mergeMap(action =>
    onExperienceDetailGet({
      access_token: getState().auth.cookies.token_data.access_token,
      ...action.payload
    })
      .map(({ response }) => {
        return {
          type: FETCH_EXPERIENCE_EACH_FULFILLED,
          payload: response
        };
      })
      .catch(ajaxError =>
        Observable.of({
          type: FETCH_EXPERIENCE_EACH_REJECTED,
          payload: ajaxError
        })
      )
  )
);

export const onExperienceDetailEdit = payload => ({
  type: EDIT_EXPERIENCE_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_EXPERIENCE_PENDING).mergeMap(action =>
    onExperienceDetailPut({
      access_token: getState().auth.cookies.token_data.access_token,
      ...action.payload
    })
      .map(({ response }) => {
        if (response.msg === "success") {
          toast.success("Updated Successfully");
          // action.payload.history.replace(
          //   `/${action.payload.username}/userdashboard/experience-details`
          // );
          return {
            type: EDIT_EXPERIENCE_FULFILLED,
            payload: response
          };
        } else throw new Error(response.msg);
      })
      .catch(ajaxError => {
        toast.error("Error in Updated");

        Observable.of({ type: EDIT_EXPERIENCE_REJECTED, payload: ajaxError });
      })
  )
);

export const onExperienceDetailRemove = payload => ({
  type: DELETE_EXPERIENCE_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_EXPERIENCE_PENDING).mergeMap(action =>
    onExperienceDetailDelete({
      access_token: getState().auth.cookies.token_data.access_token,
      ...action.payload
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Deleted Successfully");
          return [
            {
              type: DELETE_EXPERIENCE_FULFILLED,
              payload: response
            },
            {
              type: FETCH_EXPERIENCE_PENDING,
              payload: { id: action.payload.id }
            }
          ];
        } else throw new Error(response.msg);
      })
      .catch(ajaxError => {
        toast.error("Error in Deleting");

        Observable.of({ type: DELETE_EXPERIENCE_REJECTED, payload: ajaxError });
      })
  )
);

export const onIndustryList = () => ({ type: FETCH_INDUSTRY_PENDING });

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_INDUSTRY_PENDING).mergeMap(action =>
    onIndustryGetAjax({
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_INDUSTRY_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_INDUSTRY_REJECTED }))
  )
);

export const onExperienceDetailsList = payload => ({
  type: FETCH_EXPERIENCE_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_EXPERIENCE_PENDING).mergeMap(action =>
    onExperienceDetailsGet({
      access_token: getState().auth.cookies.token_data.access_token,
      ...action.payload
    })
      .map(({ response }) => {
        return {
          type: FETCH_EXPERIENCE_FULFILLED,
          payload: response
        };
      })
      .catch(ajaxError =>
        Observable.of({ type: FETCH_EXPERIENCE_REJECTED, payload: ajaxError })
      )
  )
);

export const onExperienceDetailsSubmit = payload => ({
  type: ADD_EXPERIENCE_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(ADD_EXPERIENCE_PENDING).mergeMap(action =>
    onExperienceDetailsPost({
      access_token: getState().auth.cookies.token_data.access_token,
      ...action.payload
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          return [
            {
              type: ADD_EXPERIENCE_FULFILLED,
              payload: response
            },
            {
              type: FETCH_EXPERIENCE_PENDING,
              payload: { id: action.payload.id }
            }
          ];
        } else throw new Error(response.msg);
      })
      .catch(ajaxError =>
        Observable.of({ type: ADD_EXPERIENCE_REJECTED, payload: ajaxError })
      )
  )
);

export const onBusinessAllGet = payload => ({
  type: FETCH_BUSINESS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_BUSINESS_PENDING).switchMap(({ payload }) => {
    const { rows, page, q } = getState().IndividualContainer.filterBusiness;
    const params = {};
    params.rows = rows;
    params.page = page;
    if (q) {
      params.q = q.trim();
    }

    if (payload) {
      if (payload.rows) params.rows = payload.rows;
      if (payload.page) params.page = payload.page;
    }

    return onBusinessAllGetAjax({
      access_token: getState().auth.cookies.token_data.access_token,
      params
    })
      .map(({ response }) => {
        if (
          response !== null &&
          typeof response === "object" &&
          Array.isArray(response) === false
        ) {
          // toast.success("Businesses fetched successfully!");
          return {
            type: FETCH_BUSINESS_FULFILLED,
            payload: response
          };
        } else {
          throw new Error("Error");
        }
      })
      .catch(ajaxError => {
        toast.error("Error Fetching Businesses");
        return Observable.of({ type: FETCH_BUSINESS_REJECTED });
      });
  })
);

export default epics;
