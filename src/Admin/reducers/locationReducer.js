import {
  FETCH_LOCATION_FULFILLED,
  FETCH_LOCATION_PENDING,
  FETCH_LOCATION_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  locationsFetchLoading: false,
  locations: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_LOCATION_PENDING:
      return { ...state, locationsFetchLoading: true };

    case FETCH_LOCATION_FULFILLED:
      return {
        ...state,
        locations: action.payload,
        locationsFetchLoading: false
      };

    default:
      return state;
  }
}
