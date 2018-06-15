import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";
import {
  onBusinessEachGet,
  onBusinessEachPut,
  onBusinessEachAlbumEachPhotos,
  onBusinessEachGetAjax,
  onBusinessEachPutAjax,
  onBusinessEachAlbumEachPhotosAjax,
  onBusinessEachAlbumEachPhotosDelete
} from "../../../../Business/config/businessServerCall";

import {
  UPDATE_ABOUT_PENDING,
  UPDATE_ABOUT_FULFILLED,
  UPDATE_ABOUT_REJECTED,
  FETCH_BUSINESS_PENDING,
  FETCH_BUSINESS_FULFILLED,
  FETCH_BUSINESS_REJECTED,
  UPDATE_BUSINESS_PENDING,
  UPDATE_BUSINESS_FULFILLED,
  UPDATE_BUSINESS_REJECTED,
  FETCH_PART_BUSINESS,
  TOGGLE_EDIT_ABOUT_US,
  UPDATE_LOGO_COVER_PHOTO_PENDING,
  UPDATE_LOGO_COVER_PHOTO_FULFILLED,
  UPDATE_LOGO_COVER_PHOTO_REJECTED,
  UPLOAD_GALLERY_PHOTO_FULFILLED,
  UPLOAD_GALLERY_PHOTO_PENDING,
  UPLOAD_GALLERY_PHOTO_REJECTED,
  DELETE_GALLERY_PHOTO_FULFILLED,
  DELETE_GALLERY_PHOTO_PENDING,
  DELETE_GALLERY_PHOTO_REJECTED,
  CREATE_NEW_ALBUM_PENDING,
  CREATE_NEW_ALBUM_FULFILLED,
  CREATE_NEW_ALBUM_REJECTED,
  CLEAR_MINISITE_DATA,
  UPDATE_NAV_LAYOUT_PENDING,
  UPDATE_NAV_LAYOUT_FULFILLED,
  UPDATE_NAV_LAYOUT_REJECTED
} from "./types";

const epics = [];

export const onBusinessUpdate = payload => ({
  type: UPDATE_BUSINESS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(UPDATE_BUSINESS_PENDING).mergeMap(({ payload }) => {
    const updates = Object.keys(payload.body);
    const globalState = getState();
    let TYPE;
    const extraDispatch = [];
    const successToasts = [];
    switch (updates[0]) {
      case "cover_photo":
      case "logo":
        TYPE = {
          pending: UPDATE_LOGO_COVER_PHOTO_PENDING,
          fulfilled: UPDATE_LOGO_COVER_PHOTO_FULFILLED,
          rejected: UPDATE_LOGO_COVER_PHOTO_REJECTED
        };
        successToasts.push(
          `${
            updates[0] === "cover_photo" ? "Cover Photo" : "Logo"
          } uploaded successfully`
        );
        break;
      case "about":
        TYPE = {
          pending: UPDATE_ABOUT_PENDING,
          fulfilled: UPDATE_ABOUT_FULFILLED,
          rejected: UPDATE_ABOUT_REJECTED
        };
        extraDispatch.push({ type: TOGGLE_EDIT_ABOUT_US });
        successToasts.push("About info updated Successfully!");
        break;

      case "albums":
        TYPE = {
          pending: CREATE_NEW_ALBUM_PENDING,
          fulfilled: CREATE_NEW_ALBUM_FULFILLED,
          rejected: CREATE_NEW_ALBUM_REJECTED
        };
        successToasts.push("New Album Created");
        break;

      case "nav_layout":
        TYPE = {
          pending: UPDATE_NAV_LAYOUT_PENDING,
          fulfilled: UPDATE_NAV_LAYOUT_FULFILLED,
          rejected: UPDATE_NAV_LAYOUT_REJECTED
        };
        successToasts.push("Nav Layout repositioned");
        break;

      default:
        return Observable.of({ type: UPDATE_BUSINESS_REJECTED });
    }

    return onBusinessEachPutAjax({
      body: payload.body,
      access_token: globalState.auth.cookies.token_data.access_token,
      id: globalState.MinisiteContainer.crud.id
    })
      .map(({ response }) => {
        if (response.msg === "success") {
          return {
            type: FETCH_PART_BUSINESS,
            updates,
            onSuccess: payload => [
              { type: TYPE.fulfilled, payload },
              ...extraDispatch
            ],
            successToasts,
            FAILED: TYPE.rejected,
            slug: globalState.auth.cookies.user_data.slug
          };
        } else {
          throw new Error(
            `${Object.keys(response.msg)[0]}: ${
              response.msg[Object.keys(response.msg)[0]][0]
            }`
          );
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: TYPE.rejected });
      })
      .startWith({ type: TYPE.pending });
  })
);

export const handleGalleryPhotoUpload = payload => ({
  type: UPLOAD_GALLERY_PHOTO_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(UPLOAD_GALLERY_PHOTO_PENDING).mergeMap(({ payload }) =>
    onBusinessEachAlbumEachPhotosAjax({
      body: payload.body,
      album_id: payload.album_id,
      access_token: getState().auth.cookies.token_data.access_token,
      business_id: getState().MinisiteContainer.crud.id
    }).map(
      ({ response }) =>
        response.msg === "success"
          ? {
              type: FETCH_PART_BUSINESS,
              updates: ["albums"],
              onSuccess: payload => [
                { type: UPLOAD_GALLERY_PHOTO_FULFILLED, payload }
              ],
              successToasts: ["Photo Uploaded Successfully"],
              FAILED: UPLOAD_GALLERY_PHOTO_REJECTED,
              slug: getState().auth.cookies.user_data.slug
            }
          : { type: UPLOAD_GALLERY_PHOTO_REJECTED }
    )
  )
);

export const handleGalleryPhotoDelete = payload => ({
  type: DELETE_GALLERY_PHOTO_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_GALLERY_PHOTO_PENDING).mergeMap(({ payload }) =>
    onBusinessEachAlbumEachPhotosDelete({
      body: payload.body,
      album_id: payload.album_id,
      access_token: getState().auth.cookies.token_data.access_token,
      business_id: getState().MinisiteContainer.crud.id
    }).map(
      ({ response }) =>
        response.msg === "success"
          ? {
              type: FETCH_PART_BUSINESS,
              updates: ["albums"],
              onSuccess: payload => [
                { type: DELETE_GALLERY_PHOTO_FULFILLED, payload }
              ],
              successToasts: ["Photo Deleted Successfully"],
              FAILED: DELETE_GALLERY_PHOTO_REJECTED,
              slug: getState().auth.cookies.user_data.slug
            }
          : { type: DELETE_GALLERY_PHOTO_REJECTED }
    )
  )
);

epics.push(action$ =>
  action$.ofType(FETCH_PART_BUSINESS).mergeMap(action => {
    const { slug, updates, onSuccess, successToasts, FAILED } = action;
    return onBusinessEachGetAjax({ slug })
      .concatMap(({ response }) => {
        const payload = {};
        updates.forEach(key => {
          if (response[key]) payload[key] = response[key];
        });
        successToasts &&
          successToasts.forEach(message => toast.success(message));
        return onSuccess(payload);
      })
      .catch(ajaxError => Observable.of({ type: FAILED }));
  })
);

export const onBusinessGet = payload => ({
  type: FETCH_BUSINESS_PENDING,
  payload
});

epics.push(action$ =>
  action$.ofType(FETCH_BUSINESS_PENDING).mergeMap(action => {
    const { slug, history } = action.payload;
    return onBusinessEachGetAjax({ slug })
      .map(({ response }) => {
        const payload = {};
        payload.business_name = response.business_name;
        payload.username = response.username;
        payload.cover_photo = response.cover_photo;
        payload.logo = response.logo;
        payload.id = response.id;
        payload.albums = response.albums;
        payload.slug = response.slug;
        payload.business_email = response.business_email;
        payload.business_phone = response.business_phone;
        payload.address = response.address;
        payload.branchAddress = response.branchAddress;

        if (response.about) payload.about = response.about;
        if (response.nav_layout) payload.nav_layout = response.nav_layout;

        return { type: FETCH_BUSINESS_FULFILLED, payload };
      })
      .catch(ajaxError => {
        history.replace("/404");
        return Observable.of({ type: FETCH_BUSINESS_REJECTED });
      })
      .startWith({ type: CLEAR_MINISITE_DATA });
  })
);

export const clearBusiness = () => ({ type: CLEAR_MINISITE_DATA });

export default epics;
