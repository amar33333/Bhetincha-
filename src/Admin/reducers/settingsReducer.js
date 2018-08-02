import {
  FETCH_SOCIAL_LINK_FULFILLED,
  FETCH_SOCIAL_LINK_PENDING,
  FETCH_SOCIAL_LINK_REJECTED,
  EDIT_SOCIAL_LINK_FULFILLED,
  EDIT_SOCIAL_LINK_PENDING,
  EDIT_SOCIAL_LINK_REJECTED,
  CREATE_SOCIAL_LINK_FULFILLED,
  CREATE_SOCIAL_LINK_PENDING,
  CREATE_SOCIAL_LINK_REJECTED,
  TOGGLE_SOCIAL_LINK_EDIT_MODAL,
  FETCH_IMPROVE_LISTING_FULFILLED,
  FETCH_IMPROVE_LISTING_PENDING,
  FETCH_IMPROVE_LISTING_REJECTED,
  CREATE_SEARCH_PLACEHOLDER_FULFILLED,
  CREATE_SEARCH_PLACEHOLDER_PENDING,
  CREATE_SEARCH_PLACEHOLDER_REJECTED,
  EDIT_SEARCH_PLACEHOLDER_FULFILLED,
  EDIT_SEARCH_PLACEHOLDER_PENDING,
  EDIT_SEARCH_PLACEHOLDER_REJECTED,
  FETCH_SEARCH_PLACEHOLDER_FULFILLED,
  FETCH_SEARCH_PLACEHOLDER_PENDING,
  FETCH_SEARCH_PLACEHOLDER_REJECTED,
  TOGGLE_SEARCH_PLACEHOLDER_EDIT_MODAL,
  FETCH_SUBSCRIPTION_PACKAGE_PERMISSIONS_FULFILLED,
  FETCH_SUBSCRIPTION_PACKAGE_PERMISSIONS_PENDING,
  FETCH_SUBSCRIPTION_PACKAGE_PERMISSIONS_REJECTED,
  CREATE_SUBSCRIPTION_PACKAGE_FULFILLED,
  CREATE_SUBSCRIPTION_PACKAGE_PENDING,
  CREATE_SUBSCRIPTION_PACKAGE_REJECTED,
  FETCH_SUBSCRIPTION_PACKAGE_FULFILLED,
  FETCH_SUBSCRIPTION_PACKAGE_PENDING,
  FETCH_SUBSCRIPTION_PACKAGE_REJECTED,
  EDIT_SUBSCRIPTION_PACKAGE_FULFILLED,
  EDIT_SUBSCRIPTION_PACKAGE_PENDING,
  EDIT_SUBSCRIPTION_PACKAGE_REJECTED,
  DELETE_SUBSCRIPTION_PACKAGE_FULFILLED,
  DELETE_SUBSCRIPTION_PACKAGE_PENDING,
  DELETE_SUBSCRIPTION_PACKAGE_REJECTED,
  RESET_SETTINGS_ERRORS
} from "../actions/types";

const INITIAL_STATE = {
  social_links: [],
  social_linksFetchLoading: false,
  socialLinkEditData: null,
  socialLinkEditModal: false,
  improveListings: [],
  improveListingsPages: 1,
  improveListingsRowCount: 0,
  improveListingsFetchLoading: false,
  placeholders: [],
  placeholdersFetchLoading: false,
  placeholderLoading: false,
  placeholderError: false,
  placeholderData: [],
  searchPlaceholderEditModal: false,
  searchPlaceholderEditData: null,
  settingsErrors: null,
  settingsEditErrors: null,
  subscriptionPackageLoading: false,
  subscriptionPackagePermissionsLoading: false,
  subscriptionPackagePermissionsList: [],
  subscriptionPackageList: [],
  subscriptionPackageError: null,
  subscriptionPackageEditError: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_SETTINGS_ERRORS:
      return {
        ...state,
        settingsErrors: null,
        settingsEditErrors: null
      };

    case TOGGLE_SEARCH_PLACEHOLDER_EDIT_MODAL:
      return {
        ...state,
        searchPlaceholderEditModal: !state.searchPlaceholderEditModal,
        searchPlaceholderEditData: action.payload
      };

    case FETCH_SUBSCRIPTION_PACKAGE_PERMISSIONS_PENDING:
      return { ...state, subscriptionPackagePermissionsLoading: true };

    case FETCH_SUBSCRIPTION_PACKAGE_PERMISSIONS_FULFILLED:
      return {
        ...state,
        subscriptionPackagePermissionsList: action.payload.map(each => ({
          name: each,
          id: each
        })),
        subscriptionPackagePermissionsLoading: false
      };

    case FETCH_SUBSCRIPTION_PACKAGE_PERMISSIONS_REJECTED:
      return { ...state, subscriptionPackagePermissionsLoading: false };

    case CREATE_SUBSCRIPTION_PACKAGE_PENDING:
      return { ...state, subscriptionPackageLoading: true };

    case CREATE_SUBSCRIPTION_PACKAGE_FULFILLED:
      return {
        ...state,
        subscriptionPackageLoading: false,
        subscriptionPackageError: null
      };

    case CREATE_SUBSCRIPTION_PACKAGE_REJECTED:
      return {
        ...state,
        subscriptionPackageLoading: false,
        subscriptionPackageError: action.payload
      };

    case FETCH_SUBSCRIPTION_PACKAGE_PENDING:
      return { ...state, subscriptionPackageLoading: true };

    case FETCH_SUBSCRIPTION_PACKAGE_FULFILLED:
      return {
        ...state,
        subscriptionPackageLoading: false,
        subscriptionPackageList: action.payload
      };

    case FETCH_SUBSCRIPTION_PACKAGE_REJECTED:
      return {
        ...state,
        subscriptionPackageLoading: false
      };

    case EDIT_SUBSCRIPTION_PACKAGE_PENDING:
      return { ...state, subscriptionPackageLoading: true };

    case EDIT_SUBSCRIPTION_PACKAGE_FULFILLED:
      return {
        ...state,
        subscriptionPackageLoading: false,
        subscriptionPackageEditError: null
      };

    case EDIT_SUBSCRIPTION_PACKAGE_REJECTED:
      return {
        ...state,
        subscriptionPackageLoading: false,
        subscriptionPackageEditError: action.payload
      };

    case DELETE_SUBSCRIPTION_PACKAGE_PENDING:
      return { ...state, subscriptionPackageLoading: true };

    case DELETE_SUBSCRIPTION_PACKAGE_FULFILLED:
      return {
        ...state,
        subscriptionPackageLoading: false
      };

    case DELETE_SUBSCRIPTION_PACKAGE_REJECTED:
      return {
        ...state,
        subscriptionPackageLoading: false
      };

    case FETCH_SOCIAL_LINK_PENDING:
      return { ...state, social_linksFetchLoading: true };

    case FETCH_SOCIAL_LINK_FULFILLED:
      return {
        ...state,
        social_links: action.payload.map((link, i) => ({
          ...link,
          s_no: i + 1
        })),
        social_linksFetchLoading: false
      };

    case FETCH_SOCIAL_LINK_REJECTED:
      return { ...state, social_linksFetchLoading: false };

    case CREATE_SOCIAL_LINK_PENDING:
      return { ...state, social_linksFetchLoading: true };

    case CREATE_SOCIAL_LINK_FULFILLED:
      return {
        ...state,
        social_linksFetchLoading: false,
        settingsErrors: null
      };

    case CREATE_SOCIAL_LINK_REJECTED:
      return {
        ...state,
        social_linksFetchLoading: false,
        settingsErrors: action.payload
      };

    case EDIT_SOCIAL_LINK_PENDING:
      return { ...state, social_linksFetchLoading: true };

    case EDIT_SOCIAL_LINK_FULFILLED:
      return {
        ...state,
        social_linksFetchLoading: false,
        settingsEditErrors: null
      };

    case EDIT_SOCIAL_LINK_REJECTED:
      return {
        ...state,
        social_linksFetchLoading: false,
        settingsEditErrors: action.payload
      };

    case FETCH_IMPROVE_LISTING_PENDING:
      return { ...state, improveListingsFetchLoading: true };
    case FETCH_IMPROVE_LISTING_FULFILLED:
      return {
        ...state,
        improveListings: action.payload.data.map((listing, i) => ({
          ...listing,
          s_no: action.payload.rows * (action.payload.page - 1) + i + 1
        })),
        improveListingsPages: action.payload.pages,
        improveListingsRowCount: action.payload.rowCount,
        improveListingsFetchLoading: false
      };
    case FETCH_IMPROVE_LISTING_REJECTED:
      return { ...state, improveListingsFetchLoading: false };

    case TOGGLE_SOCIAL_LINK_EDIT_MODAL:
      return {
        ...state,
        socialLinkEditModal: !state.socialLinkEditModal,
        socialLinkEditData: action.payload
      };

    // SEARCH_PLACEHOLDER
    case CREATE_SEARCH_PLACEHOLDER_PENDING:
      return { ...state, placeholderLoading: true, placeholderError: false };
    case CREATE_SEARCH_PLACEHOLDER_FULFILLED:
      return {
        ...state,
        placeholderLoading: false,
        placeholderError: false,
        settingsErrors: null
      };
    case CREATE_SEARCH_PLACEHOLDER_REJECTED:
      return {
        ...state,
        placeholderLoading: false,
        placeholderError: true,
        settingsErrors: action.payload
      };

    case EDIT_SEARCH_PLACEHOLDER_PENDING:
      return { ...state, placeholderLoading: true, placeholderError: false };
    case EDIT_SEARCH_PLACEHOLDER_FULFILLED:
      return {
        ...state,
        placeholderLoading: false,
        placeholderError: false,
        settingsEditErrors: null
      };
    case EDIT_SEARCH_PLACEHOLDER_REJECTED:
      return {
        ...state,
        placeholderLoading: false,
        placeholderError: true,
        settingsEditErrors: action.payload
      };
    case FETCH_SEARCH_PLACEHOLDER_PENDING:
      return { ...state, placeholdersFetchLoading: true };
    case FETCH_SEARCH_PLACEHOLDER_FULFILLED:
      return {
        ...state,
        placeholders: action.payload.map((placeholder, i) => ({
          ...placeholder,
          s_no: i + 1
        })),
        placeholdersFetchLoading: false
      };
    case FETCH_SEARCH_PLACEHOLDER_REJECTED:
      return { ...state, placeholdersFetchLoading: false };

    default:
      return state;
  }
}
