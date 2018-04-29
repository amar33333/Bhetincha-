import {
  SAVE_BUSINESS_LIST_PARAMS,
  BUSINESS_FILTER_ON_CHANGE,
  CLEAR_BUSINESS_FILTER
} from "../actions/types";

const INITIAL_STATE = {
  businessParams: {},

  nameSearch: "",
  industryFilter: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVE_BUSINESS_LIST_PARAMS:
      return { ...state, businessParams: action.payload };

    case BUSINESS_FILTER_ON_CHANGE:
      return { ...state, ...action.payload };

    case CLEAR_BUSINESS_FILTER:
      return {
        ...INITIAL_STATE,
        nameSearch: state.nameSearch,
        businessParams: state.businessParams
      };

    default:
      return state;
  }
}
