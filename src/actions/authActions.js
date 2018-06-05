import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import Cookies from "universal-cookie";

import {
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  FETCH_USER_PENDING,
  CREATE_USER_FULFILLED,
  CREATE_USER_REJECTED,
  CREATE_USER_PENDING,
  COOKIES_LOAD_PENDING,
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

export const loadPermissions = () => ({
  type: COOKIES_LOAD_PENDING
});

epics.push(action$ =>
  action$.ofType(COOKIES_LOAD_PENDING).mergeMap(action => {
    // console.log("acccc: ", CookiesProvider.getAccessToken());
    const access_token = CookiesProvider.getAccessToken();
    // if (access_token) {
    return onUserGet({ access_token }).map(({ response }) => {
      return {
        type: COOKIES_LOAD_FULFILLED,
        payload: {
          cookies: {
            token_data: CookiesProvider.getTokenData(),
            user_data: {
              ...CookiesProvider.getUserData(),
              permissions: response.permissions
            }
          }
        }
      };
    });
    // } else {
    //   console.log(
    //     "no access token: i.e cookies: ",
    //     CookiesProvider.getAllCookies()
    //   );
    // }
  })
);

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
        // cookies.set("token_data", response, "/", expiryDate);

        return onUserGet({ access_token: response.access_token });
      })
      .concatMap(({ response }) => {
        console.log("user repsose: ", response);
        const { permissions, ...rest } = response;
        console.log("permis rest: ", permissions, rest);

        CookiesProvider.setCookies("user_data", rest, "/", expiryDate);
        console.log("cookei: ", CookiesProvider.getAllCookies());
        return [
          { type: TOGGLE_LOGIN_MODAL },
          {
            type: FETCH_USER_FULFILLED,
            payload: {
              cookies: {
                token_data: CookiesProvider.getTokenData(),
                user_data: { ...CookiesProvider.getUserData(), permissions }
              }
            },
            history
          }
        ];
      })
      .catch(ajaxError => Observable.of({ type: FETCH_USER_REJECTED }));
  })
);

epics.push((action$, { getState }) =>
  action$
    .ofType(FETCH_USER_FULFILLED)
    .do(action => {
      const history = action.history;
      // const { groups, username } = getState().auth.cookies.user_data;
      const { groups, slug } = action.payload.cookies.user_data;

      switch (groups[0].name) {
        case USER_GROUP_BUSINESS:
          history.push(`/${slug}`);
          break;
        case USER_GROUP_INDIVIDUAL:
          // history.push("/");
          break;
        default:
          history.push("/admin");
      }
    })
    .ignoreElements()
);

export const onRegisterSubmit = payload => ({
  type: CREATE_USER_PENDING,
  payload
});

epics.push(action$ =>
  action$
    .ofType(CREATE_USER_PENDING)
    .mergeMap(action => onRegister({ ...action.payload }))
    .concatMap(({ response }) => {
      toast.success("Registered Successfully");

      return [
        { type: TOGGLE_REGISTER_MODAL },
        { type: CREATE_USER_FULFILLED, payload: response }
      ];
    })
    .catch(ajaxError =>
      Observable.of({ type: CREATE_USER_REJECTED, payload: ajaxError })
    )
);

export const onLogout = () => ({
  type: LOGOUT_USER,
  payload: null
});

export default epics;
