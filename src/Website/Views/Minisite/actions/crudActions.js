import {
  onBusinessEachGet,
  onBusinessEachPut
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
  UPDATE_COVER_PHOTO_REJECTED
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
          .then(response => {
            const data = response.data;
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
          .then(response => {
            const data = response.data;
            const payload = {};
            if (data.cover_photo) payload.cover_photo = data.cover_photo;

            dispatch({ type: UPDATE_COVER_PHOTO_FULFILLED, payload });
          })
          .catch(error => dispatch({ type: UPDATE_COVER_PHOTO_REJECTED }));
    })
    .catch(error => dispatch({ type: UPDATE_COVER_PHOTO_REJECTED }));
};

export const onBusinessGet = ({ username }) => dispatch => {
  dispatch({ type: FETCH_BUSINESS_PENDING });
  onBusinessEachGet({ username })
    .then(response => {
      console.log(response.data);
      const data = response.data;
      const payload = {};
      payload.business_name = data.business_name;
      payload.username = data.username;
      payload.cover_photo = data.cover_photo;
      payload.logo = data.logo;
      payload.id = data.id;

      if (data.about) payload.about = data.about;

      dispatch({ type: FETCH_BUSINESS_FULFILLED, payload });
    })
    .catch(error => dispatch({ type: FETCH_BUSINESS_REJECTED }));
};
