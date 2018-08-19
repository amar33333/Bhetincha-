import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";
import {
  FETCH_EACHSECTION_PENDING,
  FETCH_EACHSECTION_FULLFILLED,
  FETCH_EACHSECTION_REJECTED
} from "./types";

import { OnEachSectionGet } from "../config/sectionsServercall";
const epics = [];
export const eachSectionGet = payload => ({
  type: FETCH_EACHSECTION_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_EACHSECTION_PENDING).mergeMap(({ payload }) => {
    const sectionId = payload.sectionId;
    const business_id = getState().auth.cookies.user_data.business_id;
    console.log("business id=" + business_id);
    console.log("sectionId id=" + sectionId);

    return OnEachSectionGet(sectionId, business_id)
      .concatMap(data => {
        console.log(data);
        if (data.status === 200) {
          return [
            {
              type: FETCH_EACHSECTION_FULLFILLED,
              payload: data.response
            }
          ];
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: FETCH_EACHSECTION_REJECTED
        });
      });
  })
);
export default epics;
