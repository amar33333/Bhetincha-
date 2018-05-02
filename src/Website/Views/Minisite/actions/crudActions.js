import { Observable } from "rxjs/Observable";
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
  CREATE_NEW_ALBUM_PENDING,
  CREATE_NEW_ALBUM_FULFILLED,
  CREATE_NEW_ALBUM_REJECTED,
  CLEAR_MINISITE_DATA
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
    if (updates[0] === "cover_photo" || updates[0] === "logo") {
      TYPE = {
        pending: UPDATE_LOGO_COVER_PHOTO_PENDING,
        fulfilled: UPDATE_LOGO_COVER_PHOTO_FULFILLED,
        rejected: UPDATE_LOGO_COVER_PHOTO_REJECTED
      };
    } else if (updates[0] === "about") {
      TYPE = {
        pending: UPDATE_ABOUT_PENDING,
        fulfilled: UPDATE_ABOUT_FULFILLED,
        rejected: UPDATE_ABOUT_REJECTED
      };
      extraDispatch.push({ type: TOGGLE_EDIT_ABOUT_US });
    }

    return onBusinessEachPutAjax({
      body: payload.body,
      access_token: globalState.auth.cookies.token_data.access_token,
      id: globalState.MinisiteContainer.crud.id
    })
      .map(
        ({ response }) =>
          response.msg === "success"
            ? {
                type: FETCH_PART_BUSINESS,
                updates,
                onSuccess: payload => [
                  { type: TYPE.fulfilled, payload },
                  ...extraDispatch
                ],
                FAILED: TYPE.rejected,
                slug: globalState.auth.cookies.user_data.slug
              }
            : { type: TYPE.rejected }
      )
      .catch(ajaxError => Observable.of({ type: TYPE.rejected }))
      .startWith({ type: TYPE.pending });
  })
);

export const createNewAlbum = ({
  data,
  id,
  username,
  access_token
}) => dispatch => {
  dispatch({ type: CREATE_NEW_ALBUM_PENDING });
  onBusinessEachPut({
    id,
    access_token,
    data
  })
    .then(response => {
      response.data.msg === "success" &&
        onBusinessEachGet({ username })
          .then(innerResponse => {
            const data = innerResponse.data;
            const payload = {};
            payload.albums = data.albums;

            dispatch({
              type: CREATE_NEW_ALBUM_FULFILLED,
              payload
            });
          })
          .catch(error => dispatch({ type: CREATE_NEW_ALBUM_REJECTED }));
    })
    .catch(error => dispatch({ type: CREATE_NEW_ALBUM_REJECTED }));
};

export const handleGalleryPhotoUpload = ({
  photos,
  business_id,
  album_id,
  username,
  access_token
}) => dispatch => {
  dispatch({ type: UPLOAD_GALLERY_PHOTO_PENDING, payload: album_id });
  onBusinessEachAlbumEachPhotos({
    business_id,
    album_id,
    access_token,
    data: {
      photos: photos.map(photo => ({
        name: photo.name,
        data: photo.base64
      }))
    }
  })
    .then(response => {
      response.data.msg === "success" &&
        onBusinessEachGet({ username })
          .then(innerResponse => {
            const data = innerResponse.data;
            const payload = {};
            payload.albums = data.albums;

            dispatch({
              type: UPLOAD_GALLERY_PHOTO_FULFILLED,
              payload
            });
          })
          .catch(error => dispatch({ type: UPLOAD_GALLERY_PHOTO_REJECTED }));
    })
    .catch(error => dispatch({ type: UPLOAD_GALLERY_PHOTO_REJECTED }));
};

epics.push(action$ =>
  action$.ofType(FETCH_PART_BUSINESS).mergeMap(action => {
    const { slug, updates, onSuccess, FAILED } = action;
    return onBusinessEachGetAjax({ slug })
      .concatMap(({ response }) => {
        const payload = {};
        updates.forEach(key => {
          if (response[key]) payload[key] = response[key];
        });
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

        if (response.about) payload.about = response.about;

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
