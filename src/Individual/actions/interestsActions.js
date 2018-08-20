import { toast } from "react-toastify";
import { Observable } from "rxjs/Observable";

import { onSkillsGet, onSkillsPost } from "../config/individualServerCall";

import {
  ADD_SKILLS_FULFILLED,
  ADD_SKILLS_PENDING,
  ADD_SKILLS_REJECTED,
  FETCH_SKILLS_FULFILLED,
  FETCH_SKILLS_PENDING,
  FETCH_SKILLS_REJECTED
} from "./types";

const epics = [];

export const onSkillsList = payload => ({
  type: FETCH_SKILLS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_SKILLS_PENDING).mergeMap(action =>
    onSkillsGet({
      ...action.payload,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => {
        return {
          type: FETCH_SKILLS_FULFILLED,
          payload: response
        };
      })
      .catch(ajaxError => {
        return Observable.of({
          type: FETCH_SKILLS_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      })
  )
);

export const onSkillsSubmit = payload => ({
  type: ADD_SKILLS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(ADD_SKILLS_PENDING).mergeMap(action =>
    onSkillsPost({
      ...action.payload,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Successfully Added");

          return [
            {
              type: ADD_SKILLS_FULFILLED,
              payload: response
            },
            { type: FETCH_SKILLS_PENDING, payload: { id: action.payload.id } }
          ];
        } else throw new Error(JSON.stringify(response.msg));
      })
      .catch(ajaxError => {
        toast.error("Error in Adding");

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
