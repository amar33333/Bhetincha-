import { ajax } from "rxjs/observable/dom/ajax";
import { SECTIONS_URL, EACH_SECTION_URL } from "./API";

//section List
export const OnSectionsGet = bussinessid =>
  ajax({
    method: "GET",
    url: SECTIONS_URL + bussinessid,
    headers: {
      "Content-Type": "application/json"
    }
  });
//each section get
export const OnEachSectionGet = (sectionId, business_id) =>
  ajax({
    method: "GET",
    url: EACH_SECTION_URL + business_id + "&sectionId=" + sectionId,
    headers: {
      "Content-Type": "application/json"
    }
  });
