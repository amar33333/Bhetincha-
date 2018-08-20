import { combineReducers } from "redux";
import personalDetalilsReducer from "./personalDetailsReducer";
import interestsReducer from "./interestsReducer";
import filterBusiness from "./filterBusinessReducer";
import experience from "./experienceReducer";
import education from "./educationReducer";

const createReducer = combineReducers({
  name_of_reducer: () => ({
    hi: "hello"
  }),
  personal_details: personalDetalilsReducer,
  interests: interestsReducer,
  filterBusiness,
  experience,
  education
});

export default createReducer;
