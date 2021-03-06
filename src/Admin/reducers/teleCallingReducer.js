import {
  FETCH_BUSINESS_TELE_CALLING_FULFILLED,
  FETCH_BUSINESS_TELE_CALLING_PENDING,
  FETCH_TELE_USER_NAME_FULFILLED,
  FETCH_BUSINESS_TELE_CALLING_REJECTED,
  CREATE_TELE_USER_PENDING,
  CREATE_TELE_USER_FULFILLED,
  CREATE_TELE_USER_REJECTED,
  FETCH_TELE_USER_FULFILLED,
  FETCH_TELE_USER_PENDING,
  FETCH_TELE_USER_REJECTED
} from "../actions/types";

import { TELECALLING_DATA_SIZE } from "../views/TeleCalling/TeleCalling";

const INITIAL_STATE = {
  businessFetchLoading: false,
  businessFetchExtraLoading: false,
  business: [],
  businessRowCount: 0,
  userLoading: false,
  userError: false,
  fetchTeleUserLoading: false,
  teleUser: {},
  teleUsers: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_BUSINESS_TELE_CALLING_PENDING:
      return {
        ...state,
        businessFetchLoading:
          action.payload.body.size !== TELECALLING_DATA_SIZE ? false : true,
        businessFetchExtraLoading:
          action.payload.body.size !== TELECALLING_DATA_SIZE ? true : false
      };

    case FETCH_BUSINESS_TELE_CALLING_FULFILLED:
      return {
        ...state,
        business: action.payload.hits,
        businessRowCount: action.payload.total,
        businessFetchLoading: false,
        businessFetchExtraLoading: false
      };

    case FETCH_BUSINESS_TELE_CALLING_REJECTED:
      return {
        ...state,
        businessFetchLoading: false,
        businessFetchExtraLoading: false
      };

    case FETCH_TELE_USER_FULFILLED:
      return {
        ...state,
        teleUser: action.payload,
        fetchTeleUserLoading: false
      };

    case FETCH_TELE_USER_PENDING:
      return { ...state, fetchTeleUserLoading: true };

    case FETCH_TELE_USER_REJECTED:
      return { ...state, fetchTeleUserLoading: false };

    case FETCH_TELE_USER_NAME_FULFILLED:
      return { ...state, teleUsers: action.payload };

    case CREATE_TELE_USER_PENDING:
      return { ...state, userLoading: true, userError: false };

    case CREATE_TELE_USER_REJECTED:
      return { ...state, userLoading: false, userError: true };

    case CREATE_TELE_USER_FULFILLED:
      return { ...state, userLoading: false, userError: false };

    default:
      return state;
  }
}
