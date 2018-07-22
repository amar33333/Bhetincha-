import { combineReducers } from "redux";

const createReducer = combineReducers({
  name_of_reducer: () => ({
    hi: "hello"
  })
});

export default createReducer;
