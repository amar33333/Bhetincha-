import { ajax } from "rxjs/observable/dom/ajax";
import { SECTIONS_URL } from "./API";

//section List
export const OnSectionsGet = bussinessid =>
  ajax({
    method: "GET",
    url: SECTIONS_URL + bussinessid,
    headers: {
      "Content-Type": "application/json"
    }
  });
