import {
  FETCH_SOCIAL_LINK_FULFILLED,
  FETCH_SOCIAL_LINK_PENDING,
  FETCH_SOCIAL_LINK_REJECTED,
  TOGGLE_SOCIAL_LINK_EDIT_MODAL
} from "../actions/types";

const INITIAL_STATE = {
  social_links: [],
  socialLinkEditData: null,
  socialLinkEditModal: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SOCIAL_LINK_PENDING:
      return { ...state };

    case FETCH_SOCIAL_LINK_FULFILLED:
      return {
        ...state,
        social_links: action.payload.map((link, i) => ({
          ...link,
          s_no: i + 1
        }))
      };

    case FETCH_SOCIAL_LINK_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

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
