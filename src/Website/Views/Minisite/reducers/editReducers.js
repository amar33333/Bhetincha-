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
  CLEAR_MINISITE_DATA,
  UPDATE_LOGO_COVER_PHOTO_PENDING,
  UPDATE_LOGO_COVER_PHOTO_FULFILLED,
  UPDATE_LOGO_COVER_PHOTO_REJECTED
} from "../actions/types";
import {
  FETCH_SECTIONS_PENDING,
  FETCH_SECTIONS_FULLFILLED,
  FETCH_SECTIONS_REJECTED
} from "../components/Sections/actions/types";
const INITIAL_STATE = {
  main: false,
  mainLoading: true,
  aboutUs: false,
  aboutUsLoading: false,
  imageEditorLoading: false,
  galleryLoading: [],
  sections: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SECTIONS_PENDING:
      return {
        ...state
      };
    case FETCH_SECTIONS_FULLFILLED:
      return {
        ...state,
        sections: action.payload
      };
    case FETCH_SECTIONS_REJECTED:
      return {
        ...state
      };
    case TOGGLE_EDIT_MAIN:
      return { ...state, main: !state.main };
    case TOGGLE_EDIT_ABOUT_US:
      return { ...state, aboutUs: !state.aboutUs };
    case UPDATE_ABOUT_PENDING:
      return { ...state, aboutUsLoading: true };
    case UPDATE_ABOUT_FULFILLED:
    case UPDATE_ABOUT_REJECTED:
      return { ...state, aboutUsLoading: false };
    case UPDATE_LOGO_COVER_PHOTO_PENDING:
      return { ...state, imageEditorLoading: true };
    case UPDATE_LOGO_COVER_PHOTO_FULFILLED:
    case UPDATE_LOGO_COVER_PHOTO_REJECTED:
      return { ...state, imageEditorLoading: false };
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
