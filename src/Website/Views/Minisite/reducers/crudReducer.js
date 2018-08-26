import {
  UPDATE_ABOUT_FULFILLED,
  FETCH_BUSINESS_FULFILLED,
  UPDATE_LOGO_COVER_PHOTO_FULFILLED,
  UPLOAD_GALLERY_PHOTO_FULFILLED,
  CREATE_NEW_ALBUM_FULFILLED,
  CLEAR_MINISITE_DATA,
  UPDATE_BUSINESS_FULFILLED,
  DELETE_GALLERY_PHOTO_FULFILLED,
  DELETE_GALLERY_ALBUM_FULFILLED,
  UPDATE_NAV_LAYOUT_FULFILLED,
  FETCH_MINISITE_PERMISSIONS_FULFILLED,
  FETCH_MINISITE_PERMISSIONS_PENDING,
  FETCH_MINISITE_PERMISSIONS_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  id: "",
  slug: "",
  about: {
    tagline: "",
    aboutUs: "",
    establishedYear: "",
    companyType: ""
  },
  business_name: "",
  username: "",
  cover_photo: "/media/default_cover.png",
  logo: "/media/default_logo.png",
  albums: [],
  workingHour: [],
  alwaysOpen: false,
  industry: {
    id: "",
    name: ""
  },
  categories: [
    {
      id: "",
      name: ""
    }
  ],
  address: {
    area: {
      name: ""
    },
    branchAddress: [],
    landLineNumber: "",
    latitude: "",
    longitude: ""
  },
  links: [],
  minisitePermissions: null,
  minisitePermissionsFetchLoading: false

  // nav_layout: [
  //   {
  //     i: "home",
  //     x: 0,
  //     y: 0,
  //     w: 2,
  //     h: 1,
  //     isResizable: false
  //   },
  //   {
  //     i: "about",
  //     x: 2,
  //     y: 0,
  //     w: 2,
  //     h: 1,
  //     isResizable: false
  //   },
  //   {
  //     i: "gallery",
  //     x: 4,
  //     y: 0,
  //     w: 2,
  //     h: 1,
  //     isResizable: false
  //   },
  //   {
  //     i: "contact",
  //     x: 6,
  //     y: 0,
  //     w: 2,
  //     h: 1,
  //     isResizable: false
  //   }
  // ]
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_MINISITE_PERMISSIONS_PENDING:
      return { ...state, minisitePermissionsFetchLoading: true };
    case FETCH_MINISITE_PERMISSIONS_FULFILLED:
      return {
        ...state,
        minisitePermissionsFetchLoading: false,
        minisitePermissions: action.payload
      };
    case FETCH_MINISITE_PERMISSIONS_REJECTED:
      return { ...state, minisitePermissionsFetchLoading: false };

    case FETCH_BUSINESS_FULFILLED:
      return {
        ...INITIAL_STATE,
        minisitePermissions: state.minisitePermissions,
        minisitePermissionsFetchLoading: state.minisitePermissionsFetchLoading,
        ...action.payload
      };

    case UPDATE_NAV_LAYOUT_FULFILLED:
    case UPDATE_ABOUT_FULFILLED:
    case UPDATE_LOGO_COVER_PHOTO_FULFILLED:
    case DELETE_GALLERY_PHOTO_FULFILLED:
    case DELETE_GALLERY_ALBUM_FULFILLED:
    case UPLOAD_GALLERY_PHOTO_FULFILLED:
    case CREATE_NEW_ALBUM_FULFILLED:
    case UPDATE_BUSINESS_FULFILLED:
      return { ...state, ...action.payload };

    case CLEAR_MINISITE_DATA:
      return {
        ...INITIAL_STATE,
        minisitePermissions: state.minisitePermissions,
        minisitePermissionsFetchLoading: state.minisitePermissionsFetchLoading
      };

    default:
      return state;
  }
}
