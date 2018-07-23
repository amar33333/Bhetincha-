import {
  FETCH_SOCIAL_LINK_FULFILLED,
  FETCH_SOCIAL_LINK_PENDING,
  FETCH_SOCIAL_LINK_REJECTED,
  TOGGLE_SOCIAL_LINK_EDIT_MODAL,
  FETCH_IMPROVE_LISTING_FULFILLED,
  FETCH_IMPROVE_LISTING_PENDING,
  FETCH_IMPROVE_LISTING_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  social_links: [],
  social_linksFetchLoading: false,
  socialLinkEditData: null,
  socialLinkEditModal: false,
  improveListings: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
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

    case FETCH_IMPROVE_LISTING_PENDING:
      return { ...state };

    case FETCH_IMPROVE_LISTING_FULFILLED:
      return {
        ...state,
        improveListings: action.payload
      };

    case FETCH_IMPROVE_LISTING_REJECTED:
      return { ...state };

    case TOGGLE_SOCIAL_LINK_EDIT_MODAL:
      return {
        ...state,
        socialLinkEditModal: !state.socialLinkEditModal,
        socialLinkEditData: action.payload
      };

    default:
      return state;
  }
}
