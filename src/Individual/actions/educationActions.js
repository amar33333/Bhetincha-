import { toast } from "react-toastify";
import { Observable } from "rxjs/Observable";

import {
  onEducationDetailsPost,
  onEducationDetailsGet,
  onEducationDetailDelete,
  onEducationDetailPut,
  onEducationDetailGet
} from "../config/individualServerCall";

import {
  ADD_EDUCATION_FULFILLED,
  ADD_EDUCATION_PENDING,
  ADD_EDUCATION_REJECTED,
  FETCH_EDUCATION_FULFILLED,
  FETCH_EDUCATION_PENDING,
  FETCH_EDUCATION_REJECTED,
  FETCH_EDUCATION_EACH_FULFILLED,
  FETCH_EDUCATION_EACH_PENDING,
  FETCH_EDUCATION_EACH_REJECTED,
  EDIT_EDUCATION_EACH_FULFILLED,
  EDIT_EDUCATION_EACH_PENDING,
  EDIT_EDUCATION_EACH_REJECTED,
  DELETE_EDUCATION_FULFILLED,
  DELETE_EDUCATION_PENDING,
  DELETE_EDUCATION_REJECTED
} from "./types";

const epics = [];

export const onEducationDetailList = payload => ({
  type: FETCH_EDUCATION_EACH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_EDUCATION_EACH_PENDING).mergeMap(action =>
    onEducationDetailGet({
      ...action.payload,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => {
        return {
          type: FETCH_EDUCATION_EACH_FULFILLED,
          payload: response
        };
      })
      .catch(ajaxError => {
        return Observable.of({
          type: FETCH_EDUCATION_EACH_REJECTED,
          payload: ajaxError
        });
      })
  )
);

export const onEducationDetailEdit = payload => ({
  type: EDIT_EDUCATION_EACH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_EDUCATION_EACH_PENDING).mergeMap(action =>
    onEducationDetailPut({
      ...action.payload,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => {
        if (response.msg === "success") {
          toast.success("Successfully Updated");
          console.log("history:", action.payload.history);
          action.payload.history.replace(
            `/${action.payload.username}/userdashboard/education-details`
          );
          return {
            type: EDIT_EDUCATION_EACH_FULFILLED,
            payload: response
          };
        } else throw new Error(JSON.stringify(response.msg));
      })
      .catch(ajaxError => {
        toast.error("Error in Adding");

        return Observable.of({
          type: EDIT_EDUCATION_EACH_REJECTED,
          payload: ajaxError
        });
      })
  )
);

export const onEducationDetailRemove = payload => ({
  type: DELETE_EDUCATION_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_EDUCATION_PENDING).mergeMap(action =>
    onEducationDetailDelete({
      ...action.payload,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(({ response }) => {
        return [
          {
            type: DELETE_EDUCATION_FULFILLED,
            payload: response
          },
          { type: FETCH_EDUCATION_PENDING, payload: { id: action.payload.id } }
        ];
      })
      .catch(ajaxError => {
        return Observable.of({
          type: DELETE_EDUCATION_REJECTED,
          payload: ajaxError
        });
      })
  )
);

export const onEducationDetailsList = payload => ({
  type: FETCH_EDUCATION_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_EDUCATION_PENDING).mergeMap(action =>
    onEducationDetailsGet({
      ...action.payload,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => {
        return {
          type: FETCH_EDUCATION_FULFILLED,
          payload: response
        };
      })
      .catch(ajaxError => {
        return Observable.of({
          type: FETCH_EDUCATION_REJECTED,
          payload: ajaxError
        });
      })
  )
);

export const onEducationDetailsSubmit = payload => ({
  type: ADD_EDUCATION_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(ADD_EDUCATION_PENDING).mergeMap(action =>
    onEducationDetailsPost({
      ...action.payload,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Successfully Added");
          return [
            {
              type: ADD_EDUCATION_FULFILLED,
              payload: response
            },
            {
              type: FETCH_EDUCATION_PENDING,
              payload: { id: action.payload.id }
            }
          ];
        } else throw new Error(JSON.stringify(response.msg));
      })
      .catch(ajaxError => {
        toast.error("Error in Adding");

        return Observable.of({
          type: ADD_EDUCATION_REJECTED,
          payload: ajaxError
        });
      })
  )
);

export default epics;
