import { toast } from "react-toastify";
import { Observable } from "rxjs/Observable";

import { onSkillsPost } from "../config/individualServerCall";

import {
  ADD_SKILLS_FULFILLED,
  ADD_SKILLS_PENDING,
  ADD_SKILLS_REJECTED
} from "./types";

const epics = [];

export const onSkillsSubmit = payload => ({
  type: ADD_SKILLS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(ADD_SKILLS_PENDING).mergeMap(action =>
    onSkillsPost({
      id: action.payload.id,
      access_token: getState().auth.cookies.token_data.access_token,
      body: action.payload.body
    })
      .map(({ response }) => {
        if (response.msg === "success")
          return {
            type: ADD_SKILLS_FULFILLED,
            payload: response
          };
        else throw new Error(JSON.stringify(response.msg));
      })
      .catch(ajaxError => {
        return Observable.of({
          type: ADD_SKILLS_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      })
  )
);

export default epics;
