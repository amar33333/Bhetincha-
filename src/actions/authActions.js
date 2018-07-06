import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import Cookies from "universal-cookie";

import {
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  FETCH_USER_PENDING,
  CREATE_BUSINESS_USER_FULFILLED,
  CREATE_BUSINESS_USER_REJECTED,
  CREATE_USER_PENDING,
  CREATE_USER_FULFILLED,
  CREATE_USER_REJECTED,
  CREATE_BUSINESS_USER_PENDING,
  CREATE_INDIVIDUAL_USER_FULFILLED,
  CREATE_INDIVIDUAL_USER_REJECTED,
  CREATE_INDIVIDUAL_USER_PENDING,
  REQUEST_PHONE_VERIFICATION_FULFILLED,
  REQUEST_PHONE_VERIFICATION_PENDING,
  REQUEST_PHONE_VERIFICATION_REJECTED,
  SEND_PHONE_VERIFICATION_TOKEN_FULFILLED,
  SEND_PHONE_VERIFICATION_TOKEN_PENDING,
  SEND_PHONE_VERIFICATION_TOKEN_REJECTED,
  PERMISSIONS_LOAD_PENDING,
  PERMISSIONS_LOAD_FULFILLED,
  PERMISSIONS_LOAD_REJECTED,
  COOKIES_LOAD_FULFILLED,
  TOGGLE_PHONE_VERIFICATION_MODAL,
  RESEND_TOKEN_FULFILLED,
  RESEND_TOKEN_PENDING,
  RESEND_TOKEN_REJECTED,
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
import {
  onLogin,
  onBusinessRegister,
  onIndividualRegister,
  onUserGet,
  onPhoneVerificationRequestPost,
  onPhoneVerificationTokenPost,
  onUserRegister,
  onResendTokenPost
} from "../Common/utils/serverCall";

import querystring from "querystring";

const epics = [];

export const loadCookies = () => ({
  type: COOKIES_LOAD_FULFILLED,
  payload: { cookies: CookiesProvider.getAllCookies() }
});

export const loadPermissions = () => ({
  type: PERMISSIONS_LOAD_PENDING
});

epics.push(action$ =>
  action$.ofType(PERMISSIONS_LOAD_PENDING).mergeMap(action => {
    // console.log("acccc: ", CookiesProvider.getAccessToken());
    const access_token = CookiesProvider.getAccessToken();
    // if (access_token) {
    return onUserGet({ access_token })
      .map(({ response }) => {
        return {
          type: PERMISSIONS_LOAD_FULFILLED,
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
      })
      .catch(ajaxError => Observable.of({ type: PERMISSIONS_LOAD_REJECTED }));

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

export const onPhoneVerificationRequest = payload => ({
  type: REQUEST_PHONE_VERIFICATION_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(REQUEST_PHONE_VERIFICATION_PENDING).mergeMap(action => {
    const { history } = action.payload;

    return onPhoneVerificationRequestPost({ ...action.payload })
      .concatMap(({ response }) => {
        if (response.id) {
          toast.success("Request Sent Successfully");

          history.push({
            pathname: "/mobile-verification",
            search: `?${querystring.stringify({ id: response.id })}`
          });
          return [
            {
              type: REQUEST_PHONE_VERIFICATION_FULFILLED,
              payload: true
            },
            {
              type: TOGGLE_PHONE_VERIFICATION_MODAL,
              payload: null
            }
          ];
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: REQUEST_PHONE_VERIFICATION_REJECTED,
          payload: false
        });
      });
  })
);

export const onPhoneVerificationTokenSend = payload => ({
  type: SEND_PHONE_VERIFICATION_TOKEN_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(SEND_PHONE_VERIFICATION_TOKEN_PENDING).mergeMap(action => {
    const { history } = action.payload;
    return onPhoneVerificationTokenPost({ ...action.payload })
      .map(({ response }) => {
        if (response.id) {
          // toast.success("Request Sent Successfully");
          history.push({
            pathname: "/user-register",
            search: `?${querystring.stringify({ id: response.id })}`
          });
          return {
            type: SEND_PHONE_VERIFICATION_TOKEN_FULFILLED,
            payload: response
          };
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: SEND_PHONE_VERIFICATION_TOKEN_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onResendTokenRequest = payload => ({
  type: RESEND_TOKEN_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(RESEND_TOKEN_PENDING).mergeMap(action => {
    return onResendTokenPost({ ...action.payload })
      .map(({ response }) => {
        if (response.id) {
          toast.success("Verification code has been sent successfully");

          return {
            type: RESEND_TOKEN_FULFILLED,
            payload: response
          };
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: RESEND_TOKEN_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onUserRegisterSubmit = payload => ({
  type: CREATE_USER_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(CREATE_USER_PENDING).mergeMap(action => {
    const { history, slug } = action.payload;

    return onUserRegister({ ...action.payload })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Registered Successfully");
          console.log("respons: ", response);
          history.push({
            pathname: `/${slug}`
          });
          return [{ type: CREATE_USER_FULFILLED, payload: response }];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: CREATE_USER_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const togglePhoneVerificationModal = payload => ({
  type: TOGGLE_PHONE_VERIFICATION_MODAL,
  payload
});

export const onBusinessRegisterSubmit = payload => ({
  type: CREATE_BUSINESS_USER_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(CREATE_BUSINESS_USER_PENDING).mergeMap(action => {
    const { history } = action.payload;

    return onBusinessRegister({ ...action.payload })
      .map(({ response }) => {
        if (response.id) {
          toast.success("Registered Successfully");
          history.push({
            pathname: "/mobile-verification",
            search: `?${querystring.stringify({ id: response.id })}`
          });
          return { type: CREATE_BUSINESS_USER_FULFILLED, payload: response };
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: CREATE_BUSINESS_USER_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onIndividualRegisterSubmit = payload => ({
  type: CREATE_INDIVIDUAL_USER_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(CREATE_INDIVIDUAL_USER_PENDING).mergeMap(action =>
    onIndividualRegister({ ...action.payload })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Registered Successfully");

          return [
            { type: TOGGLE_REGISTER_MODAL },
            { type: CREATE_INDIVIDUAL_USER_FULFILLED, payload: response }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());

        return Observable.of({
          type: CREATE_INDIVIDUAL_USER_REJECTED,
          payload: ajaxError
        });
      })
  )
);

export const onLogout = () => ({
  type: LOGOUT_USER,
  payload: null
});

export default epics;
