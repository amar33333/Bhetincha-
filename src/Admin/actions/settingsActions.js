import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import { onSocialLinkPost } from "../config/adminServerCall";
import {
  CREATE_SOCIAL_LINK_FULFILLED,
  CREATE_SOCIAL_LINK_PENDING,
  CREATE_SOCIAL_LINK_REJECTED
} from "./types";

const epics = [];

export const onSocialLinkSubmit = payload => ({
  type: CREATE_SOCIAL_LINK_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_SOCIAL_LINK_PENDING).mergeMap(({ payload }) =>
    onSocialLinkPost({
      ...payload,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => {
        if (response.msg === "success") {
          toast.success("Social Link Created Successfully!");
          return { type: CREATE_SOCIAL_LINK_FULFILLED, payload: response };
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error("Error Creating Social Link !!!");
        console.log("setingactiond: ", ajaxError);
        return Observable.of({ type: CREATE_SOCIAL_LINK_REJECTED });
      })
  )
);

export default epics;
