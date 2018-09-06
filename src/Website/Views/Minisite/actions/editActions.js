// import { TOGGLE_EDIT_MAIN, TOGGLE_EDIT_ABOUT_US } from "./types";

// export const onEditMainClicked = () => ({ type: TOGGLE_EDIT_MAIN });
// export const onEditAboutUsClicked = () => ({ type: TOGGLE_EDIT_ABOUT_US });

import { TOGGLE_EDIT_MAIN, TOGGLE_EDIT_ABOUT_US } from "./types";
import {
  FETCH_SECTIONS_PENDING,
  FETCH_SECTIONS_FULLFILLED,
  FETCH_SECTIONS_REJECTED
} from "../components/Sections/actions/types";
import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";
import { OnSectionsGet } from "../components/Sections/config/sectionsServercall";

export const onEditMainClicked = () => ({ type: TOGGLE_EDIT_MAIN });
export const onEditAboutUsClicked = () => ({ type: TOGGLE_EDIT_ABOUT_US });

//section lists for specific bussiness
const epics = [];

export const OnSectionListGet = payload => ({
  type: FETCH_SECTIONS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_SECTIONS_PENDING).mergeMap(payload => {
    const bussinessid = getState().auth.cookies.user_data.business_id;
    return OnSectionsGet(bussinessid)
      .concatMap(data => {
        if (data.status === 200) {
          return [
            {
              type: FETCH_SECTIONS_FULLFILLED,
              payload: data.response.sections
            }
          ];
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: FETCH_SECTIONS_REJECTED
        });
      });
  })
);
export default epics;
