import { onLogin } from "../Common/utils/serverCall";
import { FETCH_USER } from "./types";

export const onSubmit = ({ username, password }) => ({
  type: FETCH_USER,
  payload: onLogin({ username, password })
});
