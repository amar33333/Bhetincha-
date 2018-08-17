import {
  FETCH_EACHSECTION_PENDING,
  FETCH_EACHSECTION_FULLFILLED,
  FETCH_EACHSECTION_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  sections: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_EACHSECTION_PENDING:
      return {
        ...state
      };

    case FETCH_EACHSECTION_FULLFILLED:
      console.log(" fetcheach section reducer== fullfilled /n");

      return {
        ...state,
        sections: action.payload.sections[0].children
      };
    case FETCH_EACHSECTION_REJECTED:
      console.log("fetch each section== rejected /n");

      return {
        ...state
      };
    default:
      console.log("fetch each sectionr== Default reducer /n");

      return state;
  }
}
