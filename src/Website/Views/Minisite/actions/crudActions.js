import {
  onBusinessEachGet,
  onBusinessEachPut,
  onBusinessEachAlbumEachPhotos
} from "../../../../Business/config/businessServerCall";

import {
  TOGGLE_EDIT_ABOUT_US,
  UPDATE_ABOUT_PENDING,
  UPDATE_ABOUT_FULFILLED,
  UPDATE_ABOUT_REJECTED,
  FETCH_BUSINESS_PENDING,
  FETCH_BUSINESS_FULFILLED,
  FETCH_BUSINESS_REJECTED,
  UPDATE_COVER_PHOTO_PENDING,
  UPDATE_COVER_PHOTO_FULFILLED,
  UPDATE_COVER_PHOTO_REJECTED,
  UPLOAD_GALLERY_PHOTO_FULFILLED,
  UPLOAD_GALLERY_PHOTO_PENDING,
  UPLOAD_GALLERY_PHOTO_REJECTED,
  CREATE_NEW_ALBUM_PENDING,
  CREATE_NEW_ALBUM_FULFILLED,
  CREATE_NEW_ALBUM_REJECTED
} from "./types";

export const handleAboutUsSave = ({
  id,
  access_token,
  data,
  username
}) => dispatch => {
  dispatch({ type: UPDATE_ABOUT_PENDING });
  onBusinessEachPut({ id, access_token, data })
    .then(response => {
      response.data.msg === "success" &&
        onBusinessEachGet({ username })
          .then(innerResponse => {
            const data = innerResponse.data;
            const payload = {};
            if (data.about) payload.about = data.about;

            dispatch({ type: TOGGLE_EDIT_ABOUT_US });
            dispatch({ type: UPDATE_ABOUT_FULFILLED, payload });
          })
          .catch(error => dispatch({ type: UPDATE_ABOUT_REJECTED }));
    })
    .catch(error => dispatch({ type: UPDATE_ABOUT_REJECTED }));
};

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

export const onBusinessGet = ({ username, history }) => dispatch => {
  dispatch({ type: FETCH_BUSINESS_PENDING });
  onBusinessEachGet({ username })
    .then(response => {
      const data = response.data;
      const payload = {};
      payload.business_name = data.business_name;
      payload.username = data.username;
      payload.cover_photo = data.cover_photo;
      payload.logo = data.logo;
      payload.id = data.id;
      payload.albums = data.albums;

      if (data.about) payload.about = data.about;

      dispatch({
        type: FETCH_BUSINESS_FULFILLED,
        payload
      });
    })
    .catch(error => {
      history.replace("/404");
      dispatch({ type: FETCH_BUSINESS_REJECTED });
    });
};
