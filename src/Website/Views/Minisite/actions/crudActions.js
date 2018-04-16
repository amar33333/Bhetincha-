import { onBusinessEachGet } from "../../../../Business/config/businessServerCall";

import {
  TOGGLE_EDIT_ABOUT_US,
  SAVE_ABOUT_US,
  FETCH_BUSINESS_PENDING,
  FETCH_BUSINESS_FULFILLED,
  FETCH_BUSINESS_REJECTED
} from "./types";

export const handleAboutUsSave = text => dispatch => {
  dispatch({ type: SAVE_ABOUT_US, payload: text });
  dispatch({ type: TOGGLE_EDIT_ABOUT_US });
};

export const onBusinessGet = ({ id }) => dispatch => {
  onBusinessEachGet({ id })
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
};
