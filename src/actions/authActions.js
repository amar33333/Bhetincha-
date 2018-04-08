import { onLogin } from "../Common/utils/serverCall";
import { IS_LOGGED_IN } from "./types";

export const onSubmit = ({ username, password }) => {
  // login
  onLogin({ username, password })
    .then(response => {
      console.log(response);
    })
    .catch(error => console.log(error));

  return {
    type: IS_LOGGED_IN,
    payload: "logged"
  };
};
