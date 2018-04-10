import { onLogin, onRegister } from "../Common/utils/serverCall";
import { FETCH_USER, CREATE_USER } from "./types";

export const onSubmit = ({ username, password }) => ({
  type: FETCH_USER,
  payload: onLogin({ username, password })
});

export const onRequestLoginData = ({ username, password }) => ({
  type: FETCH_USER,
  payload: onLogin({ username, password })
});
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
}) => ({
  type: CREATE_USER,
  payload: onRegister({ username, password, business_name, email })
});
