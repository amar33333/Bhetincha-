import {
  CREATE_COREMEMBER_PENDING,
  UPDATE_COREMEMBER_PENDING,
  UPDATE_COREMEMBER_FULLFILLED,
  UPDATE_COREMEMBER_REJECTED,
  DELETE_COREMEMBER_PENDING,
  DELETE_COREMEMBER_FULLFILLED,
  DELETE_COREMEMBER_REJECTED,
  CREATE_COREMEMBER_FULLFILLED,
  CREATE_COREMEMBER_REJECTED,
  FETCH_COREMEMBER_PENDING,
  FETCH_COREMEMBER_FULLFILLED_NODATA,
  FETCH_COREMEMBER_REJECTED,
  FETCH_COREMEMBER_FULLFILLED_WITHDATA,
  CREATE_MEMBER_PENDING,
  CREATE_MEMBER_FULLFILLED,
  CREATE_MEMBER_REJECTED,
  DELETE_MEMBER_PENDING,
  DELETE_MEMBER_FULLFILLED,
  DELETE_MEMBER_REJECTED,
  UPDATE_MEMBER_PENDING,
  UPDATE_MEMBER_FULLFILLED,
  UPDATE_MEMBER_REJECTED,
  CREATE_SOCIALLINK_PENDING,
  CREATE_SOCIALLINK_FULLFILLED,
  CREATE_SOCIALLINK_REJECTED,
  UPDATE_SOCIALLINK_PENDING,
  UPDATE_SOCIALLINK_FULLFILLED,
  UPDATE_SOCIALLINK_REJECTED,
  DELETE_SOCIALLINK_PENDING,
  DELETE_SOCIALLINK_FULLFILLED,
  DELETE_SOCIALLINK_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  name: "",
  members: [],
  corememberexist: false
};
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DELETE_MEMBER_PENDING:
      return {
        ...state
      };

    case DELETE_MEMBER_FULLFILLED:
      console.log(" delete member reducer== fullfilled /n");

      return {
        ...state
      };

    case DELETE_MEMBER_REJECTED:
      console.log("delete member reducer== rejected /n");

      return {
        ...state
      };
    case UPDATE_MEMBER_PENDING:
      return {
        ...state
      };

    case UPDATE_MEMBER_FULLFILLED:
      console.log(" UPDATE member reducer== fullfilled /n");

      return {
        ...state
      };

    case UPDATE_MEMBER_REJECTED:
      console.log("UPDATE member reducer== rejected /n");

      return {
        ...state
      };
    case CREATE_MEMBER_PENDING:
      return {
        ...state
      };
    case CREATE_MEMBER_FULLFILLED:
      return {
        ...state
      };
    case CREATE_MEMBER_REJECTED:
      return {
        ...state
      };

    case CREATE_COREMEMBER_PENDING:
      return {
        ...state
      };
    case CREATE_COREMEMBER_FULLFILLED:
      console.log("core member reducer== fullfilled /n");

      return {
        ...state
      };

    case CREATE_COREMEMBER_REJECTED:
      console.log("CREATE_COREMEMBER_REJECTED /n");

      return {
        ...state
      };
    case DELETE_COREMEMBER_PENDING:
      return {
        ...state
      };

    case DELETE_COREMEMBER_FULLFILLED:
      console.log("core member reducer== fullfilled /n");

      return {
        ...state
      };

    case DELETE_COREMEMBER_REJECTED:
      console.log("core member reducer== rejected /n");

      return {
        ...state
      };
    case UPDATE_COREMEMBER_PENDING:
      return {
        ...state
      };

    case UPDATE_COREMEMBER_FULLFILLED:
      console.log("core member reducer== fullfilled /n");

      return {
        ...state
      };

    case UPDATE_COREMEMBER_REJECTED:
      console.log("core member reducer== rejected /n");

      return {
        ...state
      };
    case FETCH_COREMEMBER_PENDING:
      console.log(" fetching core member reducer== pending /n");

      return {
        ...state
      };
    case FETCH_COREMEMBER_FULLFILLED_NODATA:
      console.log(" fetching core member reducer== fullfilled /n");

      return {
        ...state,
        corememberexist: false
      };
    case FETCH_COREMEMBER_FULLFILLED_WITHDATA:
      console.log(" fetching core member reducer== fullfilled /n");

      return {
        ...state,
        corememberexist: true,
        name: action.payload.name,
        members: action.payload.members
      };

    case FETCH_COREMEMBER_REJECTED:
      console.log(" fetching core member reducer== rejected /n");

      return {
        ...state
      };

    case CREATE_SOCIALLINK_PENDING:
      return {
        ...state
      };
    case CREATE_SOCIALLINK_FULLFILLED:
      return {
        ...state
      };
    case CREATE_SOCIALLINK_REJECTED:
      return {
        ...state
      };
    case UPDATE_SOCIALLINK_PENDING:
      return {
        ...state
      };
    case UPDATE_SOCIALLINK_FULLFILLED:
      return {
        ...state
      };
    case UPDATE_SOCIALLINK_REJECTED:
      return {
        ...state
      };
    case DELETE_SOCIALLINK_PENDING:
      return {
        ...state
      };

    case DELETE_SOCIALLINK_FULLFILLED:
      console.log(" delete SOCIALLINK reducer== fullfilled /n");

      return {
        ...state
      };

    case DELETE_SOCIALLINK_REJECTED:
      console.log("delete SOCIALLINK reducer== rejected /n");

      return {
        ...state
      };
    default:
      console.log("core member reducer== Default reducer /n");

      return state;
  }
}
