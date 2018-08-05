import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import { onCoreMemberAddNewPost } from "../config/businessServerCall";

import {
  CREATE_COREMEMBER_FULFILLED,
  CREATE_COREMEMBER_PENDING,
  CREATE_COREMEMBER_REJECTED
} from "./types";

const epics = [];

export const onCoreMemberNameSubmit = payload => ({
  type: CREATE_COREMEMBER_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_COREMEMBER_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const business_id = getState().auth.cookies.user_data.business_id;
    const { business_slug, body } = action.payload;

    return onCoreMemberAddNewPost({ business_id, body, access_token })
      .map(({ response }) => {
        if (response.msg === "success") {
          toast.success("Core Member Added Successfully!");
          return { type: CREATE_COREMEMBER_FULFILLED };
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: CREATE_COREMEMBER_REJECTED });
      });
  })
);

export default epics;
