import {
  FETCH_EXTRA_SECTION_PENDING,
  FETCH_EXTRA_SECTION_FULFILLED,
  FETCH_EXTRA_SECTION_REJECTED,
  UNMOUNT_EXTRA_SECTION
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: ""
};

export default function(state = INITIAL_STATE, action) {
  // console.log("actionsL: ", action);
  switch (action.type) {
    case UNMOUNT_EXTRA_SECTION:
      return {
        ...state,
        data: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };
    case FETCH_EXTRA_SECTION_PENDING:
      return { ...state, loading: true, statusClass: "pending" };

    case FETCH_EXTRA_SECTION_FULFILLED:
      // console.log("fuludids");
      return {
        ...state,
        data: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_EXTRA_SECTION_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

    default:
      return state;
  }
}
