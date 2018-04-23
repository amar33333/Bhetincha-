import { SEARCH_URL } from "./WEBSITE_API";
import { ajax } from "rxjs/observable/dom/ajax";

export const onSearch = ({ query }) =>
  ajax({
    method: "POST",
    url: SEARCH_URL,
    body: { search: query },
    headers: {
      "Content-Type": "application/json"
    }
  });

// import axios from "axios";

// export const onSearch = ({ query }) => {
//   const elastic_query = {
//     query: {
//       match: {
//         name: query
//       }
//     }
//   };
//   return axios.get(SEARCH_URL, {
//     params: {
//       source: JSON.stringify(elastic_query),
//       source_content_type: "application/json"
//     }
//   });
// };
