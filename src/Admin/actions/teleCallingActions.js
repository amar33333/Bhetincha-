import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  FETCH_BUSINESS_TELE_CALLING_FULFILLED,
  FETCH_BUSINESS_TELE_CALLING_PENDING,
  FETCH_BUSINESS_TELE_CALLING_REJECTED,
  CREATE_TELE_USER_FULFILLED,
  CREATE_TELE_USER_PENDING,
  CREATE_TELE_USER_REJECTED,
  FETCH_TELE_USER_FULFILLED,
  FETCH_TELE_USER_PENDING,
  FETCH_TELE_USER_REJECTED,
  EDIT_TELE_USER_FULFILLED,
  EDIT_TELE_USER_PENDING,
  EDIT_TELE_USER_REJECTED
} from "./types";

import {
  onBusinessTeleCallingGetAjax,
  onTeleUserPostAjax,
  onTeleUserSearchMobile,
  onTeleUserEditAjax
} from "../config/adminServerCall";

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

export const onTeleUserSubmit = payload => ({
  type: CREATE_TELE_USER_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_TELE_USER_PENDING).mergeMap(action =>
    onTeleUserPostAjax({
      access_token: getState().auth.cookies.token_data.access_token,
      ...action.payload
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("User added successfully!");
          return [
            { type: CREATE_TELE_USER_FULFILLED }
            // { type: FETCH_INDUSTRY_PENDING }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: CREATE_TELE_USER_REJECTED });
      })
  )
);

export const onTeleUserUpdate = payload => ({
  type: EDIT_TELE_USER_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_TELE_USER_PENDING).mergeMap(({ payload }) => {
    const state = getState();
    const access_token = state.auth.cookies.token_data.access_token;
    const { teleUser } = state.AdminContainer.tele_calling;
    const body = { ...payload.body };
    if (payload.body.at === "c") {
      body.business_id = teleUser.business_id;
      body.contactID = teleUser.contactID;
      body.f = teleUser.f;
    } else if (payload.body.at === "m") {
      body.id = teleUser.id;
      body.userid = teleUser.userid;
    } else if (payload.body.at === "t") {
      body.id = teleUser.id;
    }

    return onTeleUserEditAjax({
      access_token,
      body
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("User updated successfully!");
          return [
            { type: EDIT_TELE_USER_FULFILLED },
            {
              type: FETCH_TELE_USER_PENDING,
              payload: { params: { phone: payload.phone } }
            }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: EDIT_TELE_USER_REJECTED });
      });
  })
);

export const onTeleUserList = payload => ({
  type: FETCH_TELE_USER_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_TELE_USER_PENDING).mergeMap(action =>
    onTeleUserSearchMobile({
      access_token: getState().auth.cookies.token_data.access_token,
      params: action.payload.params
    })
      .map(({ response }) => ({
        type: FETCH_TELE_USER_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_TELE_USER_REJECTED }))
  )
);

export default epics;
