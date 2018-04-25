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
  TOGGLE_EDIT_ABOUT_US,
  UPDATE_ABOUT_PENDING,
  UPDATE_ABOUT_FULFILLED,
  UPDATE_ABOUT_REJECTED,
  FETCH_BUSINESS_PENDING,
  FETCH_BUSINESS_FULFILLED,
  FETCH_BUSINESS_REJECTED,
  FETCH_PART_BUSINESS,
  UPDATE_COVER_PHOTO_PENDING,
  UPDATE_COVER_PHOTO_FULFILLED,
  UPDATE_COVER_PHOTO_REJECTED,
  UPLOAD_GALLERY_PHOTO_FULFILLED,
  UPLOAD_GALLERY_PHOTO_PENDING,
  UPLOAD_GALLERY_PHOTO_REJECTED,
  CREATE_NEW_ALBUM_PENDING,
  CREATE_NEW_ALBUM_FULFILLED,
  CREATE_NEW_ALBUM_REJECTED,
  CLEAR_MINISITE_DATA
} from "./types";

const epics = [];

export const handleAboutUsSave = payload => ({
  type: UPDATE_ABOUT_PENDING,
  payload,
  updates: ["about"]
});

epics.push((action$, { getState }) =>
  action$.ofType(UPDATE_ABOUT_PENDING).mergeMap(action => {
    const { payload, updates } = action;
    const globalState = getState();
    return onBusinessEachPutAjax({
      ...payload,
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
                  { type: UPDATE_ABOUT_FULFILLED, payload },
                  { type: TOGGLE_EDIT_ABOUT_US }
                ],
                FAILED: UPDATE_ABOUT_REJECTED,
                username: globalState.auth.cookies.user_data.username
              }
            : { type: UPDATE_ABOUT_REJECTED }
      )
      .catch(ajaxError => Observable.of({ type: UPDATE_ABOUT_REJECTED }));
  })
);

export const handleCoverPhotoChange = ({
  id,
  username,
  access_token,
  data
}) => dispatch => {
  dispatch({ type: UPDATE_COVER_PHOTO_PENDING });
  onBusinessEachPut({ id, access_token, data })
    .then(response => {
      response.data.msg === "success" &&
        onBusinessEachGet({ username })
          .then(innerResponse => {
            const data = innerResponse.data;
            const payload = {};
            if (data.cover_photo) payload.cover_photo = data.cover_photo;

            dispatch({ type: UPDATE_COVER_PHOTO_FULFILLED, payload });
          })
          .catch(error => dispatch({ type: UPDATE_COVER_PHOTO_REJECTED }));
    })
    .catch(error => dispatch({ type: UPDATE_COVER_PHOTO_REJECTED }));
};

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
    const { username, updates, onSuccess, FAILED } = action;
    return onBusinessEachGetAjax({ username })
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
    const { username, history } = action.payload;
    return onBusinessEachGetAjax({ username })
      .map(({ response }) => {
        const payload = {};
        payload.business_name = response.business_name;
        payload.username = response.username;
        payload.cover_photo = response.cover_photo;
        payload.logo = response.logo;
        payload.id = response.id;
        payload.albums = response.albums;

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
