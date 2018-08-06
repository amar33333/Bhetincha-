import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  onSocialLinkPost,
  onSocialLinksGet,
  onSocialLinkEachDelete,
  onSocialLinkPut,
  onImproveListingGet,
  onSearchPlaceholderGet,
  onSearchPlaceholderPut,
  onSearchPlaceholderPost,
  onSearchPlaceholderEachDelete,
  onSubscriptionPackagePermissionsGet,
  onSubscriptionPackagePost,
  onSubscriptionPackageGet,
  onSubscriptionPackagePut,
  onSubscriptionPackageDelete,
  onSubscriptionPackageAssignPost,
  onSubscriptionPackageAssignGet,
  onSubscriptionPackageAssignDelete
} from "../config/adminServerCall";
import {
  CREATE_SOCIAL_LINK_FULFILLED,
  CREATE_SOCIAL_LINK_PENDING,
  CREATE_SOCIAL_LINK_REJECTED,
  FETCH_SOCIAL_LINK_FULFILLED,
  FETCH_SOCIAL_LINK_PENDING,
  FETCH_SOCIAL_LINK_REJECTED,
  DELETE_SOCIAL_LINK_FULFILLED,
  DELETE_SOCIAL_LINK_PENDING,
  DELETE_SOCIAL_LINK_REJECTED,
  EDIT_SOCIAL_LINK_FULFILLED,
  EDIT_SOCIAL_LINK_PENDING,
  EDIT_SOCIAL_LINK_REJECTED,
  FETCH_IMPROVE_LISTING_FULFILLED,
  FETCH_IMPROVE_LISTING_PENDING,
  FETCH_IMPROVE_LISTING_REJECTED,
  TOGGLE_SOCIAL_LINK_EDIT_MODAL,
  // SEARCH_PLACEHOLDER
  CREATE_SEARCH_PLACEHOLDER_FULFILLED,
  CREATE_SEARCH_PLACEHOLDER_REJECTED,
  CREATE_SEARCH_PLACEHOLDER_PENDING,
  FETCH_SEARCH_PLACEHOLDER_FULFILLED,
  FETCH_SEARCH_PLACEHOLDER_PENDING,
  FETCH_SEARCH_PLACEHOLDER_REJECTED,
  DELETE_SEARCH_PLACEHOLDER_PENDING,
  DELETE_SEARCH_PLACEHOLDER_FULFILLED,
  DELETE_SEARCH_PLACEHOLDER_REJECTED,
  EDIT_SEARCH_PLACEHOLDER_FULFILLED,
  EDIT_SEARCH_PLACEHOLDER_PENDING,
  EDIT_SEARCH_PLACEHOLDER_REJECTED,
  TOGGLE_SEARCH_PLACEHOLDER_EDIT_MODAL,
  FETCH_SUBSCRIPTION_PACKAGE_PERMISSIONS_FULFILLED,
  FETCH_SUBSCRIPTION_PACKAGE_PERMISSIONS_PENDING,
  FETCH_SUBSCRIPTION_PACKAGE_PERMISSIONS_REJECTED,
  CREATE_SUBSCRIPTION_PACKAGE_FULFILLED,
  CREATE_SUBSCRIPTION_PACKAGE_PENDING,
  CREATE_SUBSCRIPTION_PACKAGE_REJECTED,
  FETCH_SUBSCRIPTION_PACKAGE_FULFILLED,
  FETCH_SUBSCRIPTION_PACKAGE_PENDING,
  FETCH_SUBSCRIPTION_PACKAGE_REJECTED,
  EDIT_SUBSCRIPTION_PACKAGE_FULFILLED,
  EDIT_SUBSCRIPTION_PACKAGE_PENDING,
  EDIT_SUBSCRIPTION_PACKAGE_REJECTED,
  DELETE_SUBSCRIPTION_PACKAGE_FULFILLED,
  DELETE_SUBSCRIPTION_PACKAGE_PENDING,
  DELETE_SUBSCRIPTION_PACKAGE_REJECTED,
  CREATE_SUBSCRIPTION_PACKAGE_ASSIGN_PENDING,
  CREATE_SUBSCRIPTION_PACKAGE_ASSIGN_FULFILLED,
  CREATE_SUBSCRIPTION_PACKAGE_ASSIGN_REJECTED,
  FETCH_SUBSCRIPTION_PACKAGE_ASSIGN_PENDING,
  FETCH_SUBSCRIPTION_PACKAGE_ASSIGN_FULFILLED,
  FETCH_SUBSCRIPTION_PACKAGE_ASSIGN_REJECTED,
  DELETE_SUBSCRIPTION_PACKAGE_ASSIGN_PENDING,
  DELETE_SUBSCRIPTION_PACKAGE_ASSIGN_FULFILLED,
  DELETE_SUBSCRIPTION_PACKAGE_ASSIGN_REJECTED,
  RESET_SETTINGS_ERRORS
} from "./types";

const epics = [];

export const resetSettingsErrors = () => ({
  type: RESET_SETTINGS_ERRORS
});

export const toggleSearchPlaceholderEditModal = payload => ({
  type: TOGGLE_SEARCH_PLACEHOLDER_EDIT_MODAL,
  payload
});

export const onSubscriptionPackagePermissionsList = () => ({
  type: FETCH_SUBSCRIPTION_PACKAGE_PERMISSIONS_PENDING
});

epics.push((action$, { getState }) =>
  action$
    .ofType(FETCH_SUBSCRIPTION_PACKAGE_PERMISSIONS_PENDING)
    .mergeMap(action => {
      return onSubscriptionPackagePermissionsGet({
        access_token: getState().auth.cookies.token_data.access_token
      })
        .map(({ response }) => ({
          type: FETCH_SUBSCRIPTION_PACKAGE_PERMISSIONS_FULFILLED,
          payload: response
        }))
        .catch(ajaxError =>
          Observable.of({
            type: FETCH_SUBSCRIPTION_PACKAGE_PERMISSIONS_REJECTED
          })
        );
    })
);

export const onSubscriptionPackageAssignList = payload => ({
  type: FETCH_SUBSCRIPTION_PACKAGE_ASSIGN_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_SUBSCRIPTION_PACKAGE_ASSIGN_PENDING).mergeMap(action => {
    return onSubscriptionPackageAssignGet({
      access_token: getState().auth.cookies.token_data.access_token,
      ...action.payload
    })
      .map(({ response }) => ({
        type: FETCH_SUBSCRIPTION_PACKAGE_ASSIGN_FULFILLED,
        payload: response
      }))
      .catch(ajaxError =>
        Observable.of({
          type: FETCH_SUBSCRIPTION_PACKAGE_ASSIGN_REJECTED
        })
      );
  })
);

export const onSubscriptionPackageAssignSubmit = payload => ({
  type: CREATE_SUBSCRIPTION_PACKAGE_ASSIGN_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$
    .ofType(CREATE_SUBSCRIPTION_PACKAGE_ASSIGN_PENDING)
    .mergeMap(action => {
      const access_token = getState().auth.cookies.token_data.access_token;

      return onSubscriptionPackageAssignPost({
        ...action.payload,
        access_token
      })
        .concatMap(({ response }) => {
          if (response.msg === "success") {
            toast.success("Subscription Package Assigned successfully!");
            return [
              { type: CREATE_SUBSCRIPTION_PACKAGE_ASSIGN_FULFILLED },
              {
                type: FETCH_SUBSCRIPTION_PACKAGE_ASSIGN_PENDING,
                payload: { id: action.payload.id }
              }
            ];
          } else {
            throw new Error(JSON.stringify(response.msg));
          }
        })
        .catch(ajaxError => {
          // toast.error("Error: Assigning Subscription Package");
          return Observable.of({
            type: CREATE_SUBSCRIPTION_PACKAGE_ASSIGN_REJECTED,
            payload: ajaxError.status
              ? ajaxError.message
              : JSON.parse(ajaxError.message)
          });
        });
    })
);

export const onSubscriptionPackageAssignRemove = payload => ({
  type: DELETE_SUBSCRIPTION_PACKAGE_ASSIGN_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$
    .ofType(DELETE_SUBSCRIPTION_PACKAGE_ASSIGN_PENDING)
    .mergeMap(action => {
      const access_token = getState().auth.cookies.token_data.access_token;

      return onSubscriptionPackageAssignDelete({
        ...action.payload,
        access_token
      })
        .concatMap(({ response }) => {
          if (response.msg === "success") {
            toast.success("Subscription Package Assigned successfully!");
            return [
              { type: DELETE_SUBSCRIPTION_PACKAGE_ASSIGN_FULFILLED },
              {
                type: FETCH_SUBSCRIPTION_PACKAGE_ASSIGN_PENDING,
                payload: { id: action.payload.id }
              }
            ];
          } else {
            throw new Error(JSON.stringify(response.msg));
          }
        })
        .catch(ajaxError => {
          toast.error("Error: Deleting Subscription Package");
          return Observable.of({
            type: DELETE_SUBSCRIPTION_PACKAGE_ASSIGN_REJECTED,
            payload: ajaxError.status
              ? ajaxError.message
              : JSON.parse(ajaxError.message)
          });
        });
    })
);

export const onSubscriptionPackageList = () => ({
  type: FETCH_SUBSCRIPTION_PACKAGE_PENDING
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_SUBSCRIPTION_PACKAGE_PENDING).mergeMap(action => {
    return onSubscriptionPackageGet({
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_SUBSCRIPTION_PACKAGE_FULFILLED,
        payload: response
      }))
      .catch(ajaxError =>
        Observable.of({
          type: FETCH_SUBSCRIPTION_PACKAGE_REJECTED
        })
      );
  })
);

export const onSubscriptionPackageSubmit = payload => ({
  type: CREATE_SUBSCRIPTION_PACKAGE_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_SUBSCRIPTION_PACKAGE_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;

    return onSubscriptionPackagePost({ ...action.payload, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Subscription Package created successfully!");
          return [
            { type: CREATE_SUBSCRIPTION_PACKAGE_FULFILLED },
            { type: FETCH_SUBSCRIPTION_PACKAGE_PENDING }
          ];
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error: Creating Subscription Package");
        console.log("error: ", ajaxError);
        return Observable.of({
          type: CREATE_SUBSCRIPTION_PACKAGE_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      });
  })
);

export const onSubscriptionPackageEdit = payload => ({
  type: EDIT_SUBSCRIPTION_PACKAGE_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_SUBSCRIPTION_PACKAGE_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;

    return onSubscriptionPackagePut({ ...payload, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          // toast.success("Subscription Package created successfully!");
          return [
            { type: EDIT_SUBSCRIPTION_PACKAGE_FULFILLED },
            { type: FETCH_SUBSCRIPTION_PACKAGE_PENDING }
          ];
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error: Updating Subscription Package");
        return Observable.of({
          type: EDIT_SUBSCRIPTION_PACKAGE_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      });
  })
);

export const onSubscriptionPackageRemove = payload => ({
  type: DELETE_SUBSCRIPTION_PACKAGE_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$
    .ofType(DELETE_SUBSCRIPTION_PACKAGE_PENDING)
    .mergeMap(({ payload }) => {
      const access_token = getState().auth.cookies.token_data.access_token;

      return onSubscriptionPackageDelete({ payload, access_token })
        .concatMap(({ response }) => {
          if (response.msg === "success") {
            // toast.success("Subscription Package Deleted successfully!");
            return [
              { type: DELETE_SUBSCRIPTION_PACKAGE_FULFILLED },
              { type: FETCH_SUBSCRIPTION_PACKAGE_PENDING }
            ];
          } else {
            throw new Error(JSON.stringify(response.msg));
          }
        })
        .catch(ajaxError => {
          toast.error("Error: Deleting Subscription Package");
          return Observable.of({
            type: DELETE_SUBSCRIPTION_PACKAGE_REJECTED,
            payload: ajaxError.status
              ? ajaxError.message
              : JSON.parse(ajaxError.message)
          });
        });
    })
);

// SEARCH_PLACEHOLDER
export const onSearchPlaceholderSubmit = payload => ({
  type: CREATE_SEARCH_PLACEHOLDER_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_SEARCH_PLACEHOLDER_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;

    return onSearchPlaceholderPost({ body: payload, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("SearchPlaceholder added successfully!");
          return [
            { type: CREATE_SEARCH_PLACEHOLDER_FULFILLED },
            { type: FETCH_SEARCH_PLACEHOLDER_PENDING }
          ];
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error: Creating Search Placeholder");
        return Observable.of({
          type: CREATE_SEARCH_PLACEHOLDER_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      });
  })
);

export const onSearchPlaceholderList = () => ({
  type: FETCH_SEARCH_PLACEHOLDER_PENDING
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_SEARCH_PLACEHOLDER_PENDING).mergeMap(action => {
    return onSearchPlaceholderGet({
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_SEARCH_PLACEHOLDER_FULFILLED,
        payload: response
      }))
      .catch(ajaxError =>
        Observable.of({ type: FETCH_SEARCH_PLACEHOLDER_REJECTED })
      );
  })
);

export const onSearchPlaceholderEdit = payload => ({
  type: EDIT_SEARCH_PLACEHOLDER_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_SEARCH_PLACEHOLDER_PENDING).mergeMap(({ payload }) => {
    const { id, body } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onSearchPlaceholderPut({
      id,
      body,
      access_token
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Search Placeholder Updated Successfully!");
          return [
            { type: EDIT_SEARCH_PLACEHOLDER_FULFILLED },
            { type: FETCH_SEARCH_PLACEHOLDER_PENDING }
            // { type: TOGGLE_SEARCH_PLACEHOLDER_EDIT_MODAL }
          ];
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error: Updating Search Placeholder");
        return Observable.of({
          type: EDIT_SEARCH_PLACEHOLDER_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      });
  })
);

export const onSearchPlaceholderDelete = payload => ({
  type: DELETE_SEARCH_PLACEHOLDER_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_SEARCH_PLACEHOLDER_PENDING).mergeMap(({ payload }) =>
    onSearchPlaceholderEachDelete({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(() => {
        toast.success("Deleted Successfully!");
        return [
          { type: FETCH_SEARCH_PLACEHOLDER_PENDING },
          { type: DELETE_SEARCH_PLACEHOLDER_FULFILLED }
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Deleting Search Placeholder");
        // console.log(ajaxError);
        return Observable.of({ type: DELETE_SEARCH_PLACEHOLDER_REJECTED });
      })
  )
);

export const onImproveListingList = payload => ({
  type: FETCH_IMPROVE_LISTING_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_IMPROVE_LISTING_PENDING).switchMap(({ payload }) => {
    const {
      rows,
      page,
      business,
      name,
      sortby,
      email,
      filterProblem
    } = getState().AdminContainer.filterImproveListing;
    const params = {};
    params.rows = rows;
    params.page = page;
    if (business) {
      params.business = business.trim();
    }
    if (email) {
      params.email = email.trim();
    }
    if (name) {
      params.name = name.trim();
    }
    params.sortby = sortby.map(data => `${data.id}${data.desc ? "-desc" : ""}`);
    if (filterProblem.length) {
      params.problem = filterProblem.map(problem => problem.id);
    }
    if (payload) {
      if (payload.rows) {
        params.rows = payload.rows;
      }
      if (payload.page) {
        params.page = payload.page;
      }
      if (payload.filterProblem) {
        params.filterProblem = payload.filterProblem.map(problem => problem.id);
      }
    }

    return onImproveListingGet({
      access_token: getState().auth.cookies.token_data.access_token,
      params
    })
      .map(({ response }) => {
        return { type: FETCH_IMPROVE_LISTING_FULFILLED, payload: response };
      })
      .catch(ajaxError => {
        toast.error("Error Improve Listings !!!");
        return Observable.of({ type: FETCH_IMPROVE_LISTING_REJECTED });
      });
  })
);

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
            {
              type: CREATE_SOCIAL_LINK_FULFILLED,
              payload: response
            },
            { type: FETCH_SOCIAL_LINK_PENDING }
          ];
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error Creating Social Link !!!");
        return Observable.of({
          type: CREATE_SOCIAL_LINK_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      })
  )
);

export const onSocialLinkEdit = payload => ({
  type: EDIT_SOCIAL_LINK_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_SOCIAL_LINK_PENDING).mergeMap(({ payload }) =>
    onSocialLinkPut({
      ...payload,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Social Link Updated Successfully!");
          return [
            { type: EDIT_SOCIAL_LINK_FULFILLED, payload: response },
            { type: FETCH_SOCIAL_LINK_PENDING },
            {
              type: TOGGLE_SOCIAL_LINK_EDIT_MODAL,
              payload: null
            }
          ];
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error Updating Social Link !!!");
        return Observable.of({
          type: EDIT_SOCIAL_LINK_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
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
        return Observable.of({ type: FETCH_SOCIAL_LINK_REJECTED });
      })
  )
);

export const onSocialLinkRemove = payload => ({
  type: DELETE_SOCIAL_LINK_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_SOCIAL_LINK_PENDING).mergeMap(({ payload }) =>
    onSocialLinkEachDelete({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(() => {
        toast.success("Social Link Deleted Successfully!");
        return [
          { type: FETCH_SOCIAL_LINK_PENDING },
          { type: DELETE_SOCIAL_LINK_FULFILLED }
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Deleting Social Link");
        return Observable.of({ type: DELETE_SOCIAL_LINK_REJECTED });
      })
  )
);

export const toggleSocialLinkEditModal = payload => ({
  type: TOGGLE_SOCIAL_LINK_EDIT_MODAL,
  payload
});

export default epics;
