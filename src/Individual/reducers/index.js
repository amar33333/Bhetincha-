import { combineReducers } from "redux";
import personalDetalilsReducer from "./personalDetailsReducer";

const createReducer = combineReducers({
  name_of_reducer: () => ({
    hi: "hello"
  }),
  personal_details: personalDetalilsReducer
});

export default createReducer;
