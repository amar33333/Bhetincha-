import { AUTO_COMPLETE_SEARCH_URL, SEARCH_URL } from "./WEBSITE_API";
import { ajax } from "rxjs/observable/dom/ajax";
import querystring from "querystring";

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
      search: query
    },
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onSearchResultsGet = ({ query, frm, size }) => {
  const currentDateTime = new Date();

  console.log("blah blah: ", query, frm, size);
  return ajax({
    method: "POST",
    url: `${SEARCH_URL}`,
    body: {
      query,
      time: getISOStringStrippedSecMilliSec(currentDateTime.toISOString()),
      day: weekday[currentDateTime.getDay()],
      frm,
      size
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
