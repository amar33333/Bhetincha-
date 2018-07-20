import { Observable } from "rxjs/Observable";
import {
  onProblemTypesGet,
  onImproveListingPost
} from "../config/websiteServerCall";

import {
  TOGGLE_LOGIN_MODAL,
  TOGGLE_REGISTER_MODAL,
  TOGGLE_IMPROVE_LISTING_MODAL,
  FETCH_PROBLEM_TYPES_FULFILLED,
  FETCH_PROBLEM_TYPES_PENDING,
  FETCH_PROBLEM_TYPES_REJECTED,
  CREATE_IMPROVE_LISTING_FULFILLED,
  CREATE_IMPROVE_LISTING_PENDING,
  CREATE_IMPROVE_LISTING_REJECTED,
  STORE_USER_GEO_LOCATION
} from "./types";

const epics = [];

export const toggleLoginModal = () => ({
  type: TOGGLE_LOGIN_MODAL
});

export const toggleRegisterModal = () => ({
  type: TOGGLE_REGISTER_MODAL
});

export const toggleImproveListingModal = payload => ({
  type: TOGGLE_IMPROVE_LISTING_MODAL,
  payload
});

export const onStoreUserGeoLocation = payload => ({
  type: STORE_USER_GEO_LOCATION,
  payload
});

export const onProblemTypesList = payload => ({
  type: FETCH_PROBLEM_TYPES_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(FETCH_PROBLEM_TYPES_PENDING).mergeMap(action => {
    return onProblemTypesGet()
      .map(({ response }) => ({
        type: FETCH_PROBLEM_TYPES_FULFILLED,
        payload: response
      }))
      .catch(ajaxError =>
        Observable.of({ type: FETCH_PROBLEM_TYPES_REJECTED })
      );
  })
);

export const onImproveListing = payload => ({
  type: CREATE_IMPROVE_LISTING_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(CREATE_IMPROVE_LISTING_PENDING).mergeMap(action => {
    return onImproveListingPost({ ...action.payload })
      .concatMap(({ response }) => {
        return [
          {
            type: CREATE_IMPROVE_LISTING_FULFILLED,
            payload: response
          },
          {
            type: TOGGLE_IMPROVE_LISTING_MODAL
          }
        ];
      })
      .catch(ajaxError =>
        Observable.of({ type: CREATE_IMPROVE_LISTING_REJECTED })
      );
  })
);

export default epics;
