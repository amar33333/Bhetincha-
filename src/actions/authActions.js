import { onLogin, onRegister } from "../Common/utils/serverCall";
import {
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  FETCH_USER_PENDING,
  CREATE_USER_FULFILLED,
  CREATE_USER_REJECTED,
  CREATE_USER_PENDING
} from "./types";

export const onSubmit = ({ username, password }) => dispatch => {
  onLogin({ username, password })
    .then(response =>
      dispatch({
        type: FETCH_USER_FULFILLED,
        payload: response.data
      })
    )
    .catch(error => dispatch({ type: FETCH_USER_REJECTED, payload: error }));

  dispatch({ type: FETCH_USER_PENDING });
};

// ({
//   type: FETCH_USER,
//   payload: onLogin({ username, password })
// });

// export function onRegisterSubmit({ username, password, business_name, email }) {
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
