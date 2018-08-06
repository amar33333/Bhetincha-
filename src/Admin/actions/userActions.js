import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  onGroupPost,
  onGroupsEachDelete,
  onUserPost,
  onUsersGet,
  onGroupsGet,
  onPermissionsGet,
  onTogglePermissionPost,
  onGroupPut,
  onUserPut,
  onUserDelete,
  onUsersNotPaginatedGet
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
  FETCH_USERS_FULFILLED,
  FETCH_USERS_REJECTED,
  FETCH_USERS_PENDING,
  FETCH_USERS_NOT_PAGINATED_FULFILLED,
  FETCH_USERS_NOT_PAGINATED_REJECTED,
  FETCH_USERS_NOT_PAGINATED_PENDING,
  PERMISSIONS_LIST_PENDING,
  PERMISSIONS_LIST_REJECTED,
  PERMISSIONS_LIST_FULFILLED,
  TOGGLE_PERMISSION_PENDING,
  TOGGLE_PERMISSION_FULFILLED,
  TOGGLE_PERMISSION_REJECTED,
  DELETE_USER_GROUPS_FULFILLED,
  DELETE_USER_GROUPS_PENDING,
  DELETE_USER_GROUPS_REJECTED,
  DELETE_USER_FULFILLED,
  DELETE_USER_PENDING,
  DELETE_USER_REJECTED,
  TOGGLE_GROUP_EDIT_MODAL,
  TOGGLE_USER_EDIT_MODAL,
  EDIT_USER_FULFILLED,
  EDIT_USER_PENDING,
  EDIT_USER_REJECTED,
  EDIT_GROUP_FULFILLED,
  EDIT_GROUP_PENDING,
  EDIT_GROUP_REJECTED,
  RESET_USER_GROUP_ERRORS
} from "./types";

const epics = [];

export const resetUserGroupErrors = () => ({
  type: RESET_USER_GROUP_ERRORS
});

export const toggleGroupEditModal = payload => ({
  type: TOGGLE_GROUP_EDIT_MODAL,
  payload
});

export const toggleUserEditModal = payload => ({
  type: TOGGLE_USER_EDIT_MODAL,
  payload
});

export const onUserEdit = payload => ({
  type: EDIT_USER_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_USER_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    return onUserPut({
      ...payload,
      access_token
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("User Updated successfully!");
          return [
            { type: EDIT_USER_FULFILLED },
            { type: FETCH_USERS_PENDING },
            { type: TOGGLE_USER_EDIT_MODAL }
          ];
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error: Updating User");
        return Observable.of({
          type: EDIT_USER_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      });
  })
);

export const onGroupEdit = payload => ({
  type: EDIT_GROUP_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_GROUP_PENDING).mergeMap(({ payload }) => {
    const { group } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onGroupPut({ group, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Group Updated successfully!");
          return [
            { type: EDIT_GROUP_FULFILLED },
            { type: FETCH_GROUPS_PENDING },
            { type: TOGGLE_GROUP_EDIT_MODAL }
          ];
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error: Updating Group");
        return Observable.of({
          type: EDIT_GROUP_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      });
  })
);

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

export const onGroupSubmit = payload => ({
  type: CREATE_GROUP_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_GROUP_PENDING).mergeMap(({ payload }) =>
    onGroupPost({
      ...payload,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => {
        if (response.msg === "success") {
          toast.success("Group Created Successfully!");
          return { type: CREATE_GROUP_FULFILLED, payload: response };
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error Adding group");
        return Observable.of({
          type: CREATE_GROUP_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      })
  )
);

// export const onGroupSubmit = ({ group, access_token }) => dispatch => {
//   onGroupPost({ group, access_token })
//     .then(response => {
//       if (response.data.msg === "success") {
//         toast.success("Group Created Successfully!");
//         dispatch({ type: CREATE_GROUP_FULFILLED, payload: response.data });
//       } else {
//         toast.error("Error !!!");
//       }
//     })
//     .catch(error => {
//       toast.error("Error !!!");

//       dispatch({ type: CREATE_GROUP_REJECTED, payload: error });
//     });
//   dispatch({ type: CREATE_GROUP_PENDING });
// };

export const onGroupDelete = payload => ({
  type: DELETE_USER_GROUPS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_USER_GROUPS_PENDING).mergeMap(({ payload }) =>
    onGroupsEachDelete({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(() => {
        toast.success("Deleted Successfully!");
        return [
          { type: FETCH_GROUPS_PENDING },
          { type: DELETE_USER_GROUPS_FULFILLED }
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Deleting group");
        return Observable.of({ type: DELETE_USER_GROUPS_REJECTED });
      })
  )
);

export const onUserRemove = payload => ({
  type: DELETE_USER_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_USER_PENDING).mergeMap(({ payload }) =>
    onUserDelete({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(() => {
        toast.success("User Deleted Successfully!");
        return [{ type: FETCH_USERS_PENDING }, { type: DELETE_USER_FULFILLED }];
      })
      .catch(ajaxError => {
        toast.error("Error Deleting User");
        return Observable.of({ type: DELETE_USER_REJECTED });
      })
  )
);

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

export const onUserSubmit = payload => ({
  type: CREATE_USER_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_USER_PENDING).mergeMap(({ payload }) => {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      groups
    } = payload;

    return onUserPost({
      first_name,
      last_name,
      username,
      email,
      password,
      groups,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => {
        if (response.msg === "success") {
          toast.success("User Created Successfully!");
          return { type: CREATE_USER_FULFILLED, payload: response };
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error Creating User");
        return Observable.of({
          type: CREATE_USER_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      });
  })
);

// export const onUserSubmit = ({
//   first_name,
//   last_name,
//   username,
//   email,
//   password,
//   groups,
//   access_token
// }) => dispatch => {
//   onUserPost({
//     first_name,
//     last_name,
//     username,
//     email,
//     password,
//     groups,
//     access_token
//   })
//     .then(response => {
//       if (response.data.msg === "success") {
//         toast.success("User Created Successfully!: ");
//         dispatch({ type: CREATE_USER_FULFILLED, payload: response.data });
//       } else {
//         throw new Error(
//           response.data.msg[Object.keys(response.data.msg)[0]][0]
//         );
//         // toast.error("Error !!!");
//       }
//     })
//     .catch(error => {
//       toast.error("Error : " + error.message);

//       dispatch({ type: CREATE_USER_REJECTED, payload: error });
//     });
//   dispatch({ type: CREATE_USER_PENDING });
// };

export const onUsersNotPaginatedList = payload => ({
  type: FETCH_USERS_NOT_PAGINATED_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_USERS_NOT_PAGINATED_PENDING).switchMap(({ payload }) => {
    return onUsersNotPaginatedGet({
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_USERS_NOT_PAGINATED_FULFILLED,
        payload: response
      }))
      .catch(ajaxError =>
        Observable.of({ type: FETCH_USERS_NOT_PAGINATED_REJECTED })
      );
  })
);

export const onUsersList = payload => ({ type: FETCH_USERS_PENDING, payload });

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_USERS_PENDING).switchMap(({ payload }) => {
    const {
      rows,
      page,
      filterGroup,
      sortby,
      username,
      first_name,
      last_name
    } = getState().AdminContainer.filterUsers;

    const params = {};
    params.rows = rows;
    params.page = page;
    if (username) {
      params.username = username.trim();
    }
    if (first_name) {
      params.first_name = first_name.trim();
    }
    if (last_name) {
      params.last_name = last_name.trim();
    }

    params.sortby = sortby.map(data => `${data.id}${data.desc ? "-desc" : ""}`);

    if (filterGroup.length) {
      params.group = filterGroup.map(group => group.id);
    }

    if (payload) {
      if (payload.rows) {
        params.rows = payload.rows;
      }
      if (payload.page) {
        params.page = payload.page;
      }
    }

    return onUsersGet({
      access_token: getState().auth.cookies.token_data.access_token,
      params
    })
      .map(({ response }) => ({
        type: FETCH_USERS_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_USERS_REJECTED }));
  })
);

export default epics;
