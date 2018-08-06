import {
  AUTO_COMPLETE_SEARCH_URL,
  SEARCH_URL,
  PROBLEM_TYPES_URL,
  IMPROVE_LISTING_URL
} from "./WEBSITE_API";
import { ajax } from "rxjs/observable/dom/ajax";

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const getISOStringStrippedSecMilliSec = val => {
  const splittedVal = val.split(":");

  return `${splittedVal[0]}:${splittedVal[1]}Z`;
};

export const onSearch = ({ query }) =>
  ajax({
    method: "POST",
    url: AUTO_COMPLETE_SEARCH_URL,
    body: {
      query
    },
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onProblemTypesGet = () =>
  ajax({
    method: "GET",
    url: PROBLEM_TYPES_URL,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onImproveListingPost = ({ body, id }) =>
  ajax({
    method: "POST",
    url: `${IMPROVE_LISTING_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });
export const onSearchResultsGet = ({
  query,
  frm,
  size,
  lat,
  lon,
  distance
}) => {
  const currentDateTime = new Date();

  return ajax({
    method: "POST",
    url: `${SEARCH_URL}`,
    body: {
      query,
      time: getISOStringStrippedSecMilliSec(currentDateTime.toISOString()),
      day: weekday[currentDateTime.getDay()],
      frm,
      size,
      lat,
      lon,
      distance
    },
    headers: {
      "Content-Type": "application/json"
    }
  });
};

// import axios from "axios";

// export const onSearch = ({ query }) => {
//   const elastic_query = {
//     query: {
//       match: {
//         name: query
//       }
//     }
//   };
//   return axios.get(AUTO_COMPLETE_SEARCH_URL, {
//     params: {
//       source: JSON.stringify(elastic_query),
//       source_content_type: "application/json"
//     }
//   });
// };
