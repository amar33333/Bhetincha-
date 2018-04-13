import { SEARCH_URL } from "./WEBSITE_API";
import axios from "axios";

export const onSearch = ({ query }) => {
  const elastic_query = {
    query: {
      match: {
        name: query
      }
    }
  };
  return axios.get(SEARCH_URL, {
    params: {
      source: JSON.stringify(elastic_query),
      source_content_type: "application/json"
    }
  });
};
