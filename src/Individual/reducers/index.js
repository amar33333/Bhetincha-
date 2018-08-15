import { combineReducers } from "redux";
import personalDetalilsReducer from "./personalDetailsReducer";
import interestsReducer from "./interestsReducer";

const createReducer = combineReducers({
  name_of_reducer: () => ({
    hi: "hello"
  }),
  personal_details: personalDetalilsReducer,
  interests: interestsReducer
});

export default createReducer;
