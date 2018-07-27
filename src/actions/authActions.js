import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";
// import { BrowserRouter } from "react-router-dom";

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
  CHECK_REGISTRATION_FULFILLED,
  CHECK_REGISTRATION_PENDING,
  CHECK_REGISTRATION_REJECTED,
  FACEBOOK_LOGIN_FULFILLED,
  FACEBOOK_LOGIN_PENDING,
  FACEBOOK_LOGIN_REJECTED,
  GOOGLE_LOGIN_FULFILLED,
  GOOGLE_LOGIN_PENDING,
  GOOGLE_LOGIN_REJECTED,
  INDIVIDUAL_TOKEN_FULFILLED,
  INDIVIDUAL_TOKEN_PENDING,
  INDIVIDUAL_TOKEN_REJECTED,
  RESEND_INDIVIDUAL_TOKEN_FULFILLED,
  RESEND_INDIVIDUAL_TOKEN_PENDING,
  RESEND_INDIVIDUAL_TOKEN_REJECTED,
  CHECK_USER_ACTIVATED_PENDING,
  CHECK_USER_ACTIVATED_FULFILLED,
  CHECK_USER_ACTIVATED_REJECTED,
  FORGOT_PASSWORD_FULFILLED,
  FORGOT_PASSWORD_PENDING,
  FORGOT_PASSWORD_REJECTED,
  FORGOT_PASSWORD_TOKEN_FULFILLED,
  FORGOT_PASSWORD_TOKEN_PENDING,
  FORGOT_PASSWORD_TOKEN_REJECTED,
  RESET_PHONE_VERIFICATION_REQUEST_ERROR,
  RESET_AUTH_ERRORS,
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
  onResendTokenPost,
  onCheckRegistrationGet,
  onFacebookLogin,
  onGoogleLogin,
  onIndividualTokenPost,
  onIndividualResendTokenPost,
  onCheckUserActivatedPost,
  onForgotPasswordPost,
  onForgotPasswordTokenPost
} from "../Common/utils/serverCall";

import querystring from "querystring";

const epics = [];

export const resetErrors = () => ({
  type: RESET_AUTH_ERRORS
});

export const loadCookies = () => ({
  type: COOKIES_LOAD_FULFILLED,
  payload: { cookies: CookiesProvider.getAllCookies() }
});

export const loadPermissions = payload => ({
  type: PERMISSIONS_LOAD_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(PERMISSIONS_LOAD_PENDING).mergeMap(action => {
    const access_token = CookiesProvider.getAccessToken();
    // if (access_token) {
    return onUserGet({ access_token })
      .map(({ response }) => {
        action.payload();
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
      .catch(ajaxError => {
        console.log("ajax errro: ", ajaxError);
        action.payload();
        CookiesProvider.removeAllCookies();

        // new BrowserRouter().history.push("/logout");
        return Observable.of({ type: PERMISSIONS_LOAD_REJECTED });
      });
  })
);

export const onCheckUserActivatedSubmit = payload => ({
  type: CHECK_USER_ACTIVATED_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(CHECK_USER_ACTIVATED_PENDING).mergeMap(action => {
    const { body, history } = action.payload;
    return onCheckUserActivatedPost({ body })
      .concatMap(({ response }) => {
        if (response.phone_activated) {
          return [
            // { type: TOGGLE_LOGIN_MODAL },
            {
              type: CHECK_USER_ACTIVATED_FULFILLED,
              payload: response
            },
            {
              type: FETCH_USER_PENDING,
              payload: { ...body, history }
            }
          ];
        } else throw new Error(response.phone_activated);
      })
      .catch(ajaxError => {
        // toast.error(ajaxError.toString());
        return Observable.of({
          type: CHECK_USER_ACTIVATED_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onFacebookLoginSubmit = payload => ({
  type: FACEBOOK_LOGIN_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(FACEBOOK_LOGIN_PENDING).mergeMap(action => {
    return onFacebookLogin({ ...action.payload })
      .map(({ response }) => {
        return {
          type: FACEBOOK_LOGIN_FULFILLED,
          payload: response
        };
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: FACEBOOK_LOGIN_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onGoogleLoginSubmit = payload => ({
  type: GOOGLE_LOGIN_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(GOOGLE_LOGIN_PENDING).mergeMap(action => {
    return onGoogleLogin({ ...action.payload })
      .map(({ response }) => {
        return {
          type: GOOGLE_LOGIN_FULFILLED,
          payload: response
        };
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: GOOGLE_LOGIN_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onCheckRegistrationList = payload => ({
  type: CHECK_REGISTRATION_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(CHECK_REGISTRATION_PENDING).mergeMap(action => {
    const { id } = action.payload;
    return onCheckRegistrationGet({ id })
      .map(({ response }) => {
        return {
          type: CHECK_REGISTRATION_FULFILLED,
          payload: response.msg
        };
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: CHECK_REGISTRATION_REJECTED,
          payload: ajaxError
        });
      });
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
        CookiesProvider.setCookies("expiry_date", expiryDate, "/", expiryDate);

        // cookies.set("token_data", response, "/", expiryDate);

        return onUserGet({ access_token: response.access_token });
      })
      .concatMap(({ response }) => {
        const { permissions, ...rest } = response;

        CookiesProvider.setCookies("user_data", rest, "/", expiryDate);
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
          history.push(`/${slug}/dashboard`);
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

export const onResetPhoneVerificationRequestError = () => ({
  type: RESET_PHONE_VERIFICATION_REQUEST_ERROR
});

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
            pathname: "/user-register",
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
        return Observable.of({
          type: REQUEST_PHONE_VERIFICATION_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onForgotPasswordSubmit = payload => ({
  type: FORGOT_PASSWORD_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(FORGOT_PASSWORD_PENDING).mergeMap(action => {
    const {
      history,
      body: { phone_number }
    } = action.payload;
    return onForgotPasswordPost({ ...action.payload })
      .map(({ response }) => {
        if (response.id) {
          history.push({
            pathname: "/forgot-password-token",
            state: { phone_number }
          });
          return {
            type: FORGOT_PASSWORD_FULFILLED,
            payload: response
          };
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: FORGOT_PASSWORD_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onForgotPasswordTokenSubmit = payload => ({
  type: FORGOT_PASSWORD_TOKEN_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(FORGOT_PASSWORD_TOKEN_PENDING).mergeMap(action => {
    const { history } = action.payload;
    return onForgotPasswordTokenPost({ ...action.payload })
      .map(({ response }) => {
        if (response.msg === "success") {
          history.push({
            pathname: "/login"
          });
          return {
            type: FORGOT_PASSWORD_TOKEN_FULFILLED,
            payload: response
          };
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: FORGOT_PASSWORD_TOKEN_REJECTED,
          payload: ajaxError
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
          // history.push({
          //   pathname: `/${slug}`
          // });
          return [
            { type: CREATE_USER_FULFILLED, payload: response },
            {
              type: FETCH_USER_PENDING,
              payload: {
                username: action.payload.body.username,
                password: action.payload.body.password,
                history
              }
            },
            { type: TOGGLE_LOGIN_MODAL }
          ];
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error Creating New User");
        return Observable.of({
          type: CREATE_USER_REJECTED,
          payload: JSON.parse(ajaxError.message)
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
    const {
      history,
      body: { business_phone }
    } = action.payload;

    return onBusinessRegister({ ...action.payload })
      .map(({ response }) => {
        if (response.id) {
          history.push({
            pathname: "/user-register",
            search: `?${querystring.stringify({ id: response.id })}`,
            state: {
              business_name: response.business_name,
              already: response.already,
              business_phone
            }
          });
          return { type: CREATE_BUSINESS_USER_FULFILLED, payload: response };
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        return Observable.of({
          type: CREATE_BUSINESS_USER_REJECTED,
          payload: JSON.parse(ajaxError.message)
        });
      });
  })
);

export const onIndividualResendTokenSubmit = payload => ({
  type: RESEND_INDIVIDUAL_TOKEN_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(RESEND_INDIVIDUAL_TOKEN_PENDING).mergeMap(action => {
    const { body } = action.payload;
    return onIndividualResendTokenPost({ body })
      .map(({ response }) => {
        if (response.code) {
          toast.success("Mobile Code Sent Successfully");

          return {
            type: RESEND_INDIVIDUAL_TOKEN_FULFILLED,
            payload: response
          };
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: RESEND_INDIVIDUAL_TOKEN_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onIndividualTokenSend = payload => ({
  type: INDIVIDUAL_TOKEN_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(INDIVIDUAL_TOKEN_PENDING).mergeMap(action => {
    const { history, body } = action.payload;
    return onIndividualTokenPost({ body })
      .map(({ response }) => {
        if (response.msg === "success") {
          toast.success("Verified Successfully");
          history.push({
            pathname: "/login"
          });
          return {
            type: INDIVIDUAL_TOKEN_FULFILLED,
            payload: response
          };
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        return Observable.of({
          type: INDIVIDUAL_TOKEN_REJECTED,
          payload: JSON.parse(ajaxError.message)
        });
      });
  })
);

export const onIndividualRegisterSubmit = payload => ({
  type: CREATE_INDIVIDUAL_USER_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(CREATE_INDIVIDUAL_USER_PENDING).mergeMap(action => {
    const { history, phone_number } = action.payload;

    return onIndividualRegister({ ...action.payload })
      .map(({ response }) => {
        if (response.message) {
          history.push({
            pathname: "/activate",
            state: { phone_number }
          });
          return { type: CREATE_INDIVIDUAL_USER_FULFILLED, payload: response };
        } else throw new Error(JSON.stringify(response.msg));
      })
      .catch(ajaxError => {
        toast.error("Error: Creating New User");
        return Observable.of({
          type: CREATE_INDIVIDUAL_USER_REJECTED,
          payload: JSON.parse(ajaxError.message)
        });
      });
  })
);

export const onLogout = () => ({
  type: LOGOUT_USER
});

export default epics;
