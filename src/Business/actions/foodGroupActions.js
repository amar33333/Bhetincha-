import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  onExsectionMenuNameGet,
  onExsectionMenuNamePut,
  onExsectionMenuNamePost,
  onFoodGroupListGet,
  onFoodGroupAddNewPost,
  onFoodGroupDeleteSelf,
  onFoodGroupEditPut,
  onFoodGroupItemListGet,
  onFoodGroupItemAddNewPost,
  onFoodGroupItemRemoveEcommerce,
  onFoodGroupItemEditPut
} from "../config/businessServerCall";

import {
  CREATE_MENUNAME_FULFILLED,
  CREATE_MENUNAME_PENDING,
  CREATE_MENUNAME_REJECTED,
  FETCH_MENUNAME_FULFILLED,
  FETCH_MENUNAME_PENDING,
  FETCH_MENUNAME_REJECTED,
  UPDATE_MENUNAME_FULFILLED,
  UPDATE_MENUNAME_PENDING,
  UPDATE_MENUNAME_REJECTED,
  CREATE_FOODGROUP_FULFILLED,
  CREATE_FOODGROUP_PENDING,
  CREATE_FOODGROUP_REJECTED,
  FETCH_FOODGROUP_FULFILLED,
  FETCH_FOODGROUP_PENDING,
  FETCH_FOODGROUP_REJECTED,
  DELETE_FOODGROUP_FULFILLED,
  DELETE_FOODGROUP_PENDING,
  DELETE_FOODGROUP_REJECTED,
  UPDATE_FOODGROUP_FULFILLED,
  UPDATE_FOODGROUP_PENDING,
  UPDATE_FOODGROUP_REJECTED,
  FETCH_FOODGROUP_ITEM_FULFILLED,
  FETCH_FOODGROUP_ITEM_PENDING,
  FETCH_FOODGROUP_ITEM_REJECTED,
  CREATE_FOODGROUP_ITEM_FULFILLED,
  CREATE_FOODGROUP_ITEM_PENDING,
  CREATE_FOODGROUP_ITEM_REJECTED,
  DELETE_FOODGROUP_ITEM_FULFILLED,
  DELETE_FOODGROUP_ITEM_PENDING,
  DELETE_FOODGROUP_ITEM_REJECTED,
  UPDATE_FOODGROUP_ITEM_FULFILLED,
  UPDATE_FOODGROUP_ITEM_PENDING,
  UPDATE_FOODGROUP_ITEM_REJECTED
} from "./types";

const epics = [];

// Get Menu Name
export const onMenuNameExsection = () => ({
  type: FETCH_MENUNAME_PENDING
});
epics.push((action$, { getState }) =>
  action$.ofType(FETCH_MENUNAME_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const business_id = getState().auth.cookies.user_data.business_id;
    return onExsectionMenuNameGet({ business_id, access_token })
      .concatMap(({ response }) => {
        const extra = [];
        const menu = response.name;
        console.log(menu);
        return [
          {
            type: FETCH_MENUNAME_FULFILLED,
            payload: response
          },
          ...extra
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Fetching Menu Detail");
        return Observable.of({ type: FETCH_MENUNAME_REJECTED });
      });
  })
);

// Add New Menu Name
export const onMenuNameAddExsection = payload => ({
  type: CREATE_MENUNAME_PENDING,
  payload
});
epics.push((action$, { getState }) =>
  action$.ofType(CREATE_MENUNAME_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const business_id = getState().auth.cookies.user_data.business_id;
    const { body } = action.payload;

    return onExsectionMenuNamePost({ business_id, body, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Menu added successfully");
          return [
            { type: CREATE_MENUNAME_FULFILLED },
            { type: FETCH_MENUNAME_PENDING }
          ];
        } else {
          toast.error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: CREATE_MENUNAME_REJECTED });
      });
  })
);

// Update Menu Name
export const onMenuNameUpdateExsection = payload => ({
  type: UPDATE_MENUNAME_PENDING,
  payload
});
epics.push((action$, { getState }) =>
  action$.ofType(UPDATE_MENUNAME_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const business_id = getState().auth.cookies.user_data.business_id;
    const { body } = action.payload;

    return onExsectionMenuNamePut({ business_id, body, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Menu name updated successfully");
          return [
            { type: UPDATE_MENUNAME_FULFILLED },
            { type: FETCH_MENUNAME_PENDING }
          ];
        } else {
          toast.error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: UPDATE_MENUNAME_REJECTED });
      });
  })
);

//Food Group List
export const onFoodGroupList = () => ({
  type: FETCH_FOODGROUP_PENDING
});
epics.push((action$, { getState }) =>
  action$.ofType(FETCH_FOODGROUP_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const business_id = getState().auth.cookies.user_data.business_id;
    //console.log("businessid ="+ business_id)
    return onFoodGroupListGet({ business_id, access_token })
      .concatMap(({ response }) => {
        const extra = [];

        return [
          {
            type: FETCH_FOODGROUP_FULFILLED,
            payload: response
          },
          ...extra
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Fetching Food Groups");
        return Observable.of({ type: FETCH_FOODGROUP_REJECTED });
      });
  })
);

//Add Food Group
export const onFoodGroupSubmit = payload => ({
  type: CREATE_FOODGROUP_PENDING,
  payload
});
epics.push((action$, { getState }) =>
  action$.ofType(CREATE_FOODGROUP_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const business_id = getState().auth.cookies.user_data.business_id;
    const { business_slug, body } = action.payload;

    return onFoodGroupAddNewPost({ business_id, body, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Food Group Added Successfully!");
          return [
            { type: CREATE_FOODGROUP_FULFILLED },
            { type: FETCH_FOODGROUP_PENDING }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: CREATE_FOODGROUP_REJECTED });
      });
  })
);

//Update Food Group - Name
export const onFoodGroupEditSubmit = payload => ({
  type: UPDATE_FOODGROUP_PENDING,
  payload
});
epics.push((action$, { getState }) =>
  action$.ofType(UPDATE_FOODGROUP_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const business_id = getState().auth.cookies.user_data.business_id;
    const { fgid, body } = action.payload;
    //console.log(body+"\n Fg ID = "+fgid+"\n Access Token = "+access_token+"\n Business Id ="+business_id);
    return onFoodGroupEditPut({ business_id, body, access_token, fgid })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Food Group Updated Successfully!");
          return [
            { type: UPDATE_FOODGROUP_FULFILLED },
            { type: FETCH_FOODGROUP_PENDING }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: UPDATE_FOODGROUP_REJECTED });
      });
  })
);

// Food Group Delete
export const onFoodGroupDelete = payload => ({
  type: DELETE_FOODGROUP_PENDING,
  payload
});
epics.push((action$, { getState }) =>
  action$.ofType(DELETE_FOODGROUP_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const business_id = getState().auth.cookies.user_data.business_id;
    const { uid, routeToManageProducts } = action.payload;

    return onFoodGroupDeleteSelf({ business_id, uid, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Food Group Deleted Successfully");
          return [
            { type: DELETE_FOODGROUP_FULFILLED },
            { type: FETCH_FOODGROUP_PENDING }
            // { type: FETCH_FOODGROUP_ITEM_PENDING, payload: { uid } }
          ];
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: DELETE_FOODGROUP_REJECTED });
      });
  })
);

//Selected Food Group Item List
export const onFoodGroupFetchList = payload => ({
  type: FETCH_FOODGROUP_ITEM_PENDING,
  payload
});
epics.push((action$, { getState }) =>
  action$.ofType(FETCH_FOODGROUP_ITEM_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const business_id = getState().auth.cookies.user_data.business_id;
    const { uid, fgname } = action.payload;
    //console.log("Fg ID = "+uid+"\n Access Token = "+access_token+"\n Business Id ="+business_id);
    return onFoodGroupItemListGet({ business_id, access_token, uid })
      .concatMap(({ response }) => {
        return [
          {
            type: FETCH_FOODGROUP_ITEM_FULFILLED,
            payload: response
          }
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Fetching Food Group Item");
        return Observable.of({ type: FETCH_FOODGROUP_ITEM_REJECTED });
      });
  })
);

//Add Food Group Item
export const onFoodGroupItemSubmit = payload => ({
  type: CREATE_FOODGROUP_ITEM_PENDING,
  payload
});
epics.push((action$, { getState }) =>
  action$.ofType(CREATE_FOODGROUP_ITEM_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const business_id = getState().auth.cookies.user_data.business_id;
    const { body, uid } = action.payload;

    return onFoodGroupItemAddNewPost({ business_id, body, access_token, uid })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Food Item Added Successfully!");
          return [
            { type: CREATE_FOODGROUP_ITEM_FULFILLED },
            { type: FETCH_FOODGROUP_ITEM_PENDING, payload: { uid } }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: CREATE_FOODGROUP_ITEM_REJECTED });
      });
  })
);

// Food Group Item Delete
export const onFoodGroupItemRemove = payload => ({
  type: DELETE_FOODGROUP_ITEM_PENDING,
  payload
});
epics.push((action$, { getState }) =>
  action$.ofType(DELETE_FOODGROUP_ITEM_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const business_id = getState().auth.cookies.user_data.business_id;
    const { uid, fgitemid } = action.payload;

    return onFoodGroupItemRemoveEcommerce({
      business_id,
      uid,
      access_token,
      fgitemid
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Item Deleted Successfully");
          return [
            { type: DELETE_FOODGROUP_ITEM_FULFILLED },
            { type: FETCH_FOODGROUP_ITEM_PENDING, payload: { uid } }
          ];
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: DELETE_FOODGROUP_ITEM_REJECTED });
      });
  })
);

// Update Food Item
export const onFoodGroupItemEdit = payload => ({
  type: UPDATE_FOODGROUP_ITEM_PENDING,
  payload
});
epics.push((action$, { getState }) =>
  action$.ofType(UPDATE_FOODGROUP_ITEM_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const business_id = getState().auth.cookies.user_data.business_id;
    const { body, uid, fgitemid } = action.payload;

    return onFoodGroupItemEditPut({
      business_id,
      body,
      access_token,
      uid,
      fgitemid
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Food Item updated successfully");
          return [
            { type: UPDATE_FOODGROUP_ITEM_FULFILLED },
            { type: FETCH_FOODGROUP_ITEM_PENDING, payload: { uid } }
          ];
        } else {
          toast.error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: UPDATE_FOODGROUP_ITEM_REJECTED });
      });
  })
);

export default epics;
