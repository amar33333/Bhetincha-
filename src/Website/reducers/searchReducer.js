import { isEmpty } from "lodash";

import {
  SEARCH_QUERY_PENDING,
  SEARCH_QUERY_FULFILLED,
  SEARCH_QUERY_REJECTED,
  SEARCH_RESULTS_PAGE_FULFILLED,
  SEARCH_RESULTS_PAGE_PENDING,
  SEARCH_RESULTS_PAGE_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  search_results_page_loading: false,
  data: [],
  search_results_page_data: null,
  search_results_count: 0,
  time_taken: 0,
  distance: 0,
  geoPosition: {},

  // To be use later by Hodor, not now until he informs
  typeOfArea: undefined,
  areaName: undefined
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH_QUERY_PENDING:
      return {
        ...state,
        loading: true
      };

    case SEARCH_QUERY_FULFILLED:
      return {
        ...state,
        data: action.payload.hits.hits.map(hit => ({ ...hit._source })),
        loading: false
      };

    case SEARCH_QUERY_REJECTED:
      return {
        ...state,
        loading: false
      };

    case SEARCH_RESULTS_PAGE_PENDING:
      return {
        ...state,
        search_results_page_loading: true
      };

    case SEARCH_RESULTS_PAGE_FULFILLED:
      const { businessMatch, subCategoryMatch, otherMatch } = action.payload;
      const address = {};

      if (!isEmpty(otherMatch)) {
        console.log("enterererrerererrerer");
        if (
          otherMatch.findings.area._source.Kind === "Country" ||
          otherMatch.findings.area._source.kind === "Country"
        ) {
          address.country = otherMatch.findings.area._source.name;
          address.state = undefined;
          address.district = undefined;
          address.city = undefined;
          address.area = undefined;
        } else if (
          otherMatch.findings.area._source.Kind === "State" ||
          otherMatch.findings.area._source.kind === "State"
        ) {
          address.country = otherMatch.findings.area._source.country;
          address.state = otherMatch.findings.area._source.name;
          address.district = undefined;
          address.city = undefined;
          address.area = undefined;
        } else if (
          otherMatch.findings.area._source.Kind === "District" ||
          otherMatch.findings.area._source.kind === "District"
        ) {
          address.country = otherMatch.findings.area._source.country;
          address.state = otherMatch.findings.area._source.state;
          address.district = otherMatch.findings.area._source.name;
          address.city = undefined;
          address.area = undefined;
        } else if (
          otherMatch.findings.area._source.Kind === "City" ||
          otherMatch.findings.area._source.kind === "City"
        ) {
          address.country = otherMatch.findings.area._source.country;
          address.state = otherMatch.findings.area._source.state;
          address.district = otherMatch.findings.area._source.district;
          address.city = otherMatch.findings.area._source.name;
          address.area = undefined;
        } else if (
          otherMatch.findings.area._source.Kind === "Area" ||
          otherMatch.findings.area._source.kind === "Area"
        ) {
          address.country = otherMatch.findings.area._source.country;
          address.state = otherMatch.findings.area._source.state;
          address.district = otherMatch.findings.area._source.district;
          address.city = otherMatch.findings.area._source.city;
          address.area = otherMatch.findings.area._source.name;
        }
      }
      console.log("asdasd: ", address);

      const hitMatch =
        (!isEmpty(businessMatch) && {
          ...businessMatch.hit._source.address.area,

          hit: businessMatch.hit,
          hits: businessMatch.otherSimiliar
        }) ||
        (!isEmpty(subCategoryMatch) && subCategoryMatch) ||
        (!isEmpty(otherMatch) && {
          hits: otherMatch.hits,
          ...otherMatch.findings,
          ...address
        });

      return {
        ...state,
        search_results_page_data: hitMatch,
        search_results_count: hitMatch.hits.total,
        // time_taken: action.payload.took,
        search_results_page_loading: false
      };

    // case SEARCH_RESULTS_PAGE_FULFILLED:
    //   return {
    //     ...state,
    //     search_results_page_data: action.payload.hits.hits.map(hit => ({
    //       ...hit._source,
    //       id: hit._id
    //     })),
    //     search_results_count: action.payload.hits.total,
    //     time_taken: action.payload.took,
    //     search_results_page_loading: false
    //   };

    case SEARCH_RESULTS_PAGE_REJECTED:
      return {
        ...state,
        search_results_page_loading: false
      };

    default:
      return state;
  }
}
