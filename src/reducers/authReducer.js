import { IS_LOGGED_IN } from "../actions/types";

export default function(state = { name: "hello" }, action) {
  switch (action.type) {
    case IS_LOGGED_IN:
      console.log(action.payload);
      return { ...state };

    default:
      return state;
  }
}
