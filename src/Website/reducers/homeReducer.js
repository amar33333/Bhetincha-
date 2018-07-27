import {
  TOGGLE_LOGIN_MODAL,
  TOGGLE_REGISTER_MODAL,
  TOGGLE_IMPROVE_LISTING_MODAL,
  FETCH_PROBLEM_TYPES_FULFILLED,
  FETCH_PROBLEM_TYPES_PENDING,
  FETCH_PROBLEM_TYPES_REJECTED,
  STORE_USER_GEO_LOCATION,
  TOGGLE_GET_DIRECTION_MODAL
} from "../actions/types";

const INITIAL_STATE = {
  loginModal: false,
  registerModal: false,
  // phoneVerificationModal: false,
  improveListingModal: false,
  improveListingData: null,
  problem_types: [],
  user_geo_coords: null,
  getDirectionModal: false,
  getDirectionData: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_LOGIN_MODAL:
      return { ...state, loginModal: !state.loginModal };

    case TOGGLE_REGISTER_MODAL:
      return { ...state, registerModal: !state.registerModal };

    case TOGGLE_GET_DIRECTION_MODAL:
      return {
        ...state,
        getDirectionModal: !state.getDirectionModal,
        getDirectionData: action.payload
      };

    case TOGGLE_IMPROVE_LISTING_MODAL:
      return {
        ...state,
        improveListingModal: !state.improveListingModal,
        improveListingData: action.payload
      };

    case STORE_USER_GEO_LOCATION:
      return {
        ...state,
        ...action.payload
      };

    case FETCH_PROBLEM_TYPES_PENDING:
      return {
        ...state
      };

    case FETCH_PROBLEM_TYPES_FULFILLED:
      return {
        ...state,
        problem_types: action.payload
      };

    case FETCH_PROBLEM_TYPES_REJECTED:
      return {
        ...state
      };

    // case TOGGLE_PHONE_VERIFICATION_MODAL:
    //   return {
    //     ...state,
    //     phoneVerificationModal: !state.phoneVerificationModal
    //   };

    default:
      return state;
  }
}
