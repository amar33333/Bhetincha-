import { onLogin, onRegister, onUserGet } from "../Common/utils/serverCall";
import {
  FETCH_USER,
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  FETCH_USER_PENDING,
  CREATE_USER_FULFILLED,
  CREATE_USER_REJECTED,
  CREATE_USER_PENDING,
  TOGGLE_LOGIN_MODAL,
  TOGGLE_REGISTER_MODAL
} from "./types";

export const toggleLoginModal = show => ({
  type: TOGGLE_LOGIN_MODAL,
  payload: show
});
export const toggleRegisterModal = show => ({
  type: TOGGLE_REGISTER_MODAL,
  payload: show
});

export const onSubmit = ({ username, password, history }) => dispatch => {
  onLogin({ username, password })
    .then(response => {
      onUserGet({ access_token: response.data.access_token })
        .then(userData => {
          dispatch({
            type: FETCH_USER_FULFILLED,
            payload: userData.data
          });
          // if (userData.data.username === "admin") history.push("/admin");
          // else
          history.push(`/${userData.data.username}`);
        })
        .catch(error =>
          dispatch({ type: FETCH_USER_REJECTED, payload: error })
        );

      // dispatch({
      //   type: FETCH_USER_FULFILLED,
      //   payload: response.data
      // });
    })
    .catch(error => dispatch({ type: FETCH_USER_REJECTED, payload: error }));

  dispatch({ type: FETCH_USER_PENDING });
};

// ({
//   type: FETCH_USER,
//   payload: onLogin({ username, password })
// });

export const onRequestLoginData = ({ username, password }) => ({
  type: FETCH_USER,
  payload: onLogin({ username, password })
});
// // export function onRegisterSubmit({ username, password, business_name, email }) {
//   return {
//     type: CREATE_USER,
//     payload: onRegister({ username, password })
//   };
// }

export const onRegisterSubmit = ({
  username,
  password,
  business_name,
  email
}) => dispatch => {
  onRegister({ username, password, business_name, email })
    .then(response =>
      dispatch({ type: CREATE_USER_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: CREATE_USER_REJECTED, payload: error }));

  dispatch({ type: CREATE_USER_PENDING });
};
// ({
//   type: CREATE_USER,
//   payload: onRegister({ username, password, business_name, email })
// });
