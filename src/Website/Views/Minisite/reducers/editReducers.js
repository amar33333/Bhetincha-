import {
  TOGGLE_EDIT_MAIN,
  TOGGLE_EDIT_ABOUT_US,
  UPDATE_ABOUT_PENDING,
  UPDATE_ABOUT_FULFILLED,
  UPDATE_ABOUT_REJECTED,
  FETCH_BUSINESS_PENDING,
  FETCH_BUSINESS_FULFILLED,
  FETCH_BUSINESS_REJECTED,
  UPLOAD_GALLERY_PHOTO_PENDING,
  UPLOAD_GALLERY_PHOTO_FULFILLED,
  UPLOAD_GALLERY_PHOTO_REJECTED,
  CREATE_NEW_ALBUM_FULFILLED,
  CLEAR_MINISITE_DATA
} from "../actions/types";

const INITIAL_STATE = {
  main: false,
  mainLoading: true,
  aboutUs: false,
  aboutUsLoading: false,
  galleryLoading: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_EDIT_MAIN:
      return { ...state, main: !state.main };
    case TOGGLE_EDIT_ABOUT_US:
      return { ...state, aboutUs: !state.aboutUs };
    case UPDATE_ABOUT_PENDING:
      return { ...state, aboutUsLoading: true };
    case UPDATE_ABOUT_FULFILLED:
    case UPDATE_ABOUT_REJECTED:
      return { ...state, aboutUsLoading: false };
    case FETCH_BUSINESS_PENDING:
      return { ...state, mainLoading: true };
    case FETCH_BUSINESS_FULFILLED:
      return {
        ...state,
        mainLoading: false,
        galleryLoading: action.payload.albums.map(album => ({
          albumID: album.albumID,
          loading: false
        }))
      };

    case FETCH_BUSINESS_REJECTED:
      return { ...state, mainLoading: false };

    case UPLOAD_GALLERY_PHOTO_PENDING:
      return {
        ...state,
        galleryLoading: state.galleryLoading.map(
          album =>
            album.albumID === action.payload
              ? { ...album, loading: true }
              : album
        )
      };
    case UPLOAD_GALLERY_PHOTO_REJECTED:
      return {
        ...state,
        galleryLoading: state.galleryLoading.map(album => ({
          albumID: album.albumID,
          loading: false
        }))
      };

    case CREATE_NEW_ALBUM_FULFILLED:
    case UPLOAD_GALLERY_PHOTO_FULFILLED:
      return {
        ...state,
        galleryLoading: action.payload.albums.map(album => ({
          albumID: album.albumID,
          loading: false
        }))
      };

    case CLEAR_MINISITE_DATA:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}
