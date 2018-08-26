import { ajax } from "rxjs/observable/dom/ajax";
import { MINISITE_PERMISSIONS_URL } from "../config/MINISITE_API";

export const onMinisitePermissionsGet = ({ id }) => {
  return ajax({
    method: "get",
    url: `${MINISITE_PERMISSIONS_URL}${id}/`,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
