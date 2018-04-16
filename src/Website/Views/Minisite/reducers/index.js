import { combineReducers } from "redux";
import crud from "./crudReducer";
import edit from "./editReducers";

export default combineReducers({ crud, edit });
