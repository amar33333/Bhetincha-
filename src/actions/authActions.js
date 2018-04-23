import { Observable } from "rxjs/Observable";
import {
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  FETCH_USER_PENDING,
  CREATE_USER_FULFILLED,
  CREATE_USER_REJECTED,
  CREATE_USER_PENDING,
  COOKIES_LOAD_FULFILLED,
  LOGOUT_USER
} from "./types";

import {
  TOGGLE_LOGIN_MODAL,
  TOGGLE_REGISTER_MODAL
} from "../Website/actions/types";

import {
  USER_GROUP_BUSINESS,
  USER_GROUP_INDIVIDUAL
} from "../config/CONSTANTS";

import CookiesProvider from "../Common/utils/CookiesProvider";
import { onLogin, onRegister, onUserGet } from "../Common/utils/serverCall";

const epics = [];

export const loadCookies = () => ({
  type: COOKIES_LOAD_FULFILLED,
  payload: { cookies: CookiesProvider.getAllCookies() }
});

export const onSubmit = payload => ({
  type: FETCH_USER_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(FETCH_USER_PENDING).mergeMap(action => {
    const { username, password, history } = action.payload;
    const expiryDate = new Date(new Date().valueOf() + 1000 * 60 * 60 * 10);

    return onLogin({ username, password })
      .mergeMap(({ response }) => {
        CookiesProvider.setCookies("token_data", response, "/", expiryDate);
        return onUserGet({ access_token: response.access_token });
      })
      .concatMap(({ response }) => {
        CookiesProvider.setCookies("user_data", response, "/", expiryDate);

        switch (response.groups[0].name) {
          case USER_GROUP_BUSINESS:
            history.push(`/${response.username}`);
            break;
          case USER_GROUP_INDIVIDUAL:
            // history.push("/");
            break;
          default:
            history.push(`/admin`);
        }

        return [
          { type: TOGGLE_LOGIN_MODAL },
          {
            type: FETCH_USER_FULFILLED,
            payload: { cookies: CookiesProvider.getAllCookies() }
          }
        ];
      })
      .catch(ajaxError => Observable.of({ type: FETCH_USER_REJECTED }));
  })
);

export const onRegisterSubmit = payload => ({
  type: CREATE_USER_PENDING,
  payload
});

epics.push(action$ =>
  action$
    .ofType(CREATE_USER_PENDING)
    .mergeMap(action => onRegister({ ...action.payload }))
    .concatMap(({ response }) => [
      { type: TOGGLE_REGISTER_MODAL },
      { type: CREATE_USER_FULFILLED, payload: response }
    ])
    .catch(ajaxError =>
      Observable.of({ type: CREATE_USER_REJECTED, payload: ajaxError })
    )
);

export const onLogout = () => ({
  type: LOGOUT_USER,
  payload: null
});

export default epics;
