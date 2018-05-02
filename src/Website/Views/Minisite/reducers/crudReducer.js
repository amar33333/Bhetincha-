import {
  UPDATE_ABOUT_FULFILLED,
  FETCH_BUSINESS_FULFILLED,
  UPDATE_LOGO_COVER_PHOTO_FULFILLED,
  UPLOAD_GALLERY_PHOTO_FULFILLED,
  CREATE_NEW_ALBUM_FULFILLED,
  CLEAR_MINISITE_DATA,
  UPDATE_BUSINESS_FULFILLED
} from "../actions/types";

const INITIAL_STATE = {
  id: "",
  slug: "",
  about: {
    tagline: "",
    aboutUs: "",
    establishedYear: ""
    // companyType: ""
  },
  business_name: "",
  username: "",
  cover_photo: "/media/default_cover.png",
  logo: "/media/default_logo.png",
  albums: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_BUSINESS_FULFILLED:
      return { ...INITIAL_STATE, ...action.payload };

    case UPDATE_ABOUT_FULFILLED:
    case UPDATE_LOGO_COVER_PHOTO_FULFILLED:
    case UPLOAD_GALLERY_PHOTO_FULFILLED:
    case CREATE_NEW_ALBUM_FULFILLED:
    case UPDATE_BUSINESS_FULFILLED:
      return { ...state, ...action.payload };

    case CLEAR_MINISITE_DATA:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}
