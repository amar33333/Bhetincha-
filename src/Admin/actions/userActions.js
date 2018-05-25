import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  onGroupPost,
  onUserPost,
  onUserGet,
  onGroupsGet,
  onPermissionsGet,
  onTogglePermissionPost
} from "../config/adminServerCall";
import {
  CREATE_GROUP_FULFILLED,
  CREATE_GROUP_REJECTED,
  CREATE_GROUP_PENDING,
  CREATE_USER_FULFILLED,
  CREATE_USER_REJECTED,
  CREATE_USER_PENDING,
  FETCH_GROUPS_FULFILLED,
  FETCH_GROUPS_REJECTED,
  FETCH_GROUPS_PENDING,
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  FETCH_USER_PENDING,
  PERMISSIONS_LIST_PENDING,
  PERMISSIONS_LIST_REJECTED,
  PERMISSIONS_LIST_FULFILLED,
  TOGGLE_PERMISSION_PENDING,
  TOGGLE_PERMISSION_FULFILLED,
  TOGGLE_PERMISSION_REJECTED
} from "./types";

const epics = [];

export const onTogglePermission = payload => ({
  type: TOGGLE_PERMISSION_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(TOGGLE_PERMISSION_PENDING).mergeMap(({ payload }) => {
    const { group_id, global_permission, checked } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onTogglePermissionPost({
      group_id,
      global_permission,
      checked,
      access_token
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Permission Update Successfully!");
          return [
            { type: TOGGLE_PERMISSION_FULFILLED },
            { type: FETCH_GROUPS_PENDING }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: TOGGLE_PERMISSION_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onPermissionsList = () => ({ type: PERMISSIONS_LIST_PENDING });

epics.push((action$, { getState }) =>
  action$.ofType(PERMISSIONS_LIST_PENDING).mergeMap(action =>
    onPermissionsGet({
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: PERMISSIONS_LIST_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: PERMISSIONS_LIST_REJECTED }))
  )
);

export const onGroupsList = () => ({ type: FETCH_GROUPS_PENDING });

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_GROUPS_PENDING).mergeMap(action =>
    onGroupsGet({
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_GROUPS_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_GROUPS_REJECTED }))
  )
);

export const onGroupSubmit = ({ group, access_token }) => dispatch => {
  onGroupPost({ group, access_token })
    .then(response => {
      if (response.data.msg === "success") {
        toast.success("Group Created Successfully!");
        dispatch({ type: CREATE_GROUP_FULFILLED, payload: response.data });
      } else {
        toast.error("Error !!!");
      }
    })
    .catch(error => {
      toast.error("Error !!!");

      dispatch({ type: CREATE_GROUP_REJECTED, payload: error });
    });
  dispatch({ type: CREATE_GROUP_PENDING });
};

// export const onGroupList = ({ access_token }) => dispatch => {
//   onGroupGet({ access_token })
//     .then(response => {
//       dispatch({ type: FETCH_GROUP_FULFILLED, payload: response.data });
//     })
//     .catch(error => {
//       dispatch({ type: FETCH_GROUP_REJECTED, payload: error.data });
//     });
//   dispatch({ type: FETCH_GROUP_PENDING });
// };

export const onUserSubmit = ({
  first_name,
  last_name,
  username,
  email,
  password,
  groups,
  access_token
}) => dispatch => {
  onUserPost({
    first_name,
    last_name,
    username,
    email,
    password,
    groups,
    access_token
  })
    .then(response => {
      if (response.data.msg === "success") {
        toast.success("User Created Successfully!");
        dispatch({ type: CREATE_USER_FULFILLED, payload: response.data });
      } else {
        toast.error("Error !!!");
      }
    })
    .catch(error => {
      toast.error("Error !!!");

      dispatch({ type: CREATE_USER_REJECTED, payload: error });
    });
  dispatch({ type: CREATE_USER_PENDING });
};

export const onUserList = ({ access_token }) => dispatch => {
  onUserGet({ access_token })
    .then(response => {
      dispatch({ type: FETCH_USER_FULFILLED, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: FETCH_USER_REJECTED, payload: error.data });
    });
  dispatch({ type: FETCH_USER_PENDING });
};

export default epics;
