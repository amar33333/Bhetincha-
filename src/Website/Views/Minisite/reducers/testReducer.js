import { TEST } from "../actions/types";

const INITIAL_STATE = {
  msg: "test loaded"
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TEST:
      return { ...state, msg: "test changed the message" };

    default:
      return state;
  }
}
