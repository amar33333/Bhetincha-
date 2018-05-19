import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  onIndustryPostAjax,
  onIndustryGetAjax,
  onIndustryEachGetAjax,
  onIndustryEachDeleteAjax,
  onIndustryPut
} from "../config/adminServerCall";

import {
  CREATE_INDUSTRY_FULFILLED,
  CREATE_INDUSTRY_REJECTED,
  CREATE_INDUSTRY_PENDING,
  FETCH_INDUSTRY_FULFILLED,
  FETCH_INDUSTRY_REJECTED,
  FETCH_INDUSTRY_PENDING,
  FETCH_INDUSTRY_EACH_FULFILLED,
  FETCH_INDUSTRY_EACH_REJECTED,
  FETCH_INDUSTRY_EACH_PENDING,
  DELETE_INDUSTRY_PENDING,
  DELETE_INDUSTRY_FULFILLED,
  DELETE_INDUSTRY_REJECTED,
  TOGGLE_INDUSTRY_EDIT_MODAL,
  EDIT_INDUSTRY_FULFILLED,
  EDIT_INDUSTRY_PENDING,
  EDIT_INDUSTRY_REJECTED,
  UNMOUNT_INDUSTRY_DATA,
  UNMOUNT_INDUSTRY
} from "./types";

const epics = [];

export const onIndustrySubmit = payload => ({
  type: CREATE_INDUSTRY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_INDUSTRY_PENDING).mergeMap(({ payload }) => {
    const { industry } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onIndustryPostAjax({ industry, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Industry added successfully!");
          return [
            { type: CREATE_INDUSTRY_FULFILLED },
            { type: FETCH_INDUSTRY_PENDING }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: CREATE_INDUSTRY_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onIndustryEdit = payload => ({
  type: EDIT_INDUSTRY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_INDUSTRY_PENDING).mergeMap(({ payload }) => {
    const { industry } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onIndustryPut({ industry, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Industry Updated successfully!");
          return [
            { type: EDIT_INDUSTRY_FULFILLED },
            { type: FETCH_INDUSTRY_PENDING },
            { type: TOGGLE_INDUSTRY_EDIT_MODAL }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: EDIT_INDUSTRY_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onIndustryList = () => ({ type: FETCH_INDUSTRY_PENDING });

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_INDUSTRY_PENDING).mergeMap(action =>
    onIndustryGetAjax({
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_INDUSTRY_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_INDUSTRY_REJECTED }))
  )
);

export const onIndustryDelete = payload => ({
  type: DELETE_INDUSTRY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_INDUSTRY_PENDING).mergeMap(({ payload }) =>
    onIndustryEachDeleteAjax({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(() => {
        toast.success("Deleted Successfully!");
        return [
          { type: FETCH_INDUSTRY_PENDING },
          { type: DELETE_INDUSTRY_FULFILLED }
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Deleting Industry");
        console.log(ajaxError);
        return Observable.of({ type: DELETE_INDUSTRY_REJECTED });
      })
  )
);

export const onIndustryEachList = payload => ({
  type: FETCH_INDUSTRY_EACH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_INDUSTRY_EACH_PENDING).mergeMap(({ payload }) =>
    onIndustryEachGetAjax({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_INDUSTRY_EACH_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => {
        return Observable.of({ type: FETCH_INDUSTRY_EACH_REJECTED });
      })
  )
);

// export const onIndustryEachList = ({ id, access_token }) => dispatch => {
//   onIndustryEachGet({ id, access_token })
//     .then(response =>
//       dispatch({ type: FETCH_INDUSTRY_EACH_FULFILLED, payload: response.data })
//     )
//     .catch(error =>
//       dispatch({ type: FETCH_INDUSTRY_EACH_REJECTED, payload: error })
//     );

//   dispatch({ type: FETCH_INDUSTRY_EACH_PENDING });
// };

export const toggleIndustryEditModal = payload => ({
  type: TOGGLE_INDUSTRY_EDIT_MODAL,
  payload
});

// export const onUnmountIndustry = () => ({
//   type: UNMOUNT_INDUSTRY,
//   payload: null
// });

export const onUnmountIndustry = () => ({ type: UNMOUNT_INDUSTRY });

export const onUnmountIndustryData = () => ({
  type: UNMOUNT_INDUSTRY_DATA,
  payload: null
});

export default epics;
