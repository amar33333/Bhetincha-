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
  onSearchPlaceholderEachDelete
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
  EDIT_SEARCH_PLACEHOLDER_REJECTED
} from "./types";

const epics = [];

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
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: CREATE_SEARCH_PLACEHOLDER_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onSearchPlaceholderList = () => ({
  type: FETCH_SEARCH_PLACEHOLDER_PENDING
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_SEARCH_PLACEHOLDER_PENDING).mergeMap(action =>
    onSearchPlaceholderGet({
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_SEARCH_PLACEHOLDER_FULFILLED,
        payload: response
      }))
      .catch(ajaxError =>
        Observable.of({ type: FETCH_SEARCH_PLACEHOLDER_REJECTED })
      )
  )
);

export const onSearchPlaceholderEdit = payload => ({
  type: EDIT_SEARCH_PLACEHOLDER_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_SEARCH_PLACEHOLDER_PENDING).mergeMap(({ payload }) => {
    const { country } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onSearchPlaceholderPut({ country, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Search Placeholder Updated Successfully!");
          return [
            { type: EDIT_SEARCH_PLACEHOLDER_FULFILLED },
            { type: FETCH_SEARCH_PLACEHOLDER_PENDING }
            // { type: TOGGLE_SEARCH_PLACEHOLDER_EDIT_MODAL }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: EDIT_SEARCH_PLACEHOLDER_REJECTED,
          payload: ajaxError
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
        console.log("setingactiond: ", ajaxError);
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
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error("Error Updating Social Link !!!");
        return Observable.of({ type: EDIT_SOCIAL_LINK_REJECTED });
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
        console.log(ajaxError);
        return Observable.of({ type: DELETE_SOCIAL_LINK_REJECTED });
      })
  )
);

export const toggleSocialLinkEditModal = payload => ({
  type: TOGGLE_SOCIAL_LINK_EDIT_MODAL,
  payload
});

export default epics;
