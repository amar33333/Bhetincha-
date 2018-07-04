import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import { onSocialLinkPost, onSocialLinksGet } from "../config/adminServerCall";
import {
  CREATE_SOCIAL_LINK_FULFILLED,
  CREATE_SOCIAL_LINK_PENDING,
  CREATE_SOCIAL_LINK_REJECTED,
  FETCH_SOCIAL_LINK_FULFILLED,
  FETCH_SOCIAL_LINK_PENDING,
  FETCH_SOCIAL_LINK_REJECTED
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
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Social Link Created Successfully!");
          return [
            { type: CREATE_SOCIAL_LINK_FULFILLED, payload: response },
            { type: FETCH_SOCIAL_LINK_PENDING }
          ];
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

export const onSocialLinksList = () => ({
  type: FETCH_SOCIAL_LINK_PENDING
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_SOCIAL_LINK_PENDING).mergeMap(action =>
    onSocialLinksGet({
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => {
        return { type: FETCH_SOCIAL_LINK_FULFILLED, payload: response };
      })
      .catch(ajaxError => {
        toast.error("Error Fetching Social Link !!!");
        console.log("setingactiond: ", ajaxError);
        return Observable.of({ type: FETCH_SOCIAL_LINK_REJECTED });
      })
  )
);
export default epics;
