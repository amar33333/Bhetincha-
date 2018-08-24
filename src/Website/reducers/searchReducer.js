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
  loading: true,
  search_results_page_loading: true,
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

      const temp =
        (!isEmpty(otherMatch) && otherMatch) ||
        (!isEmpty(subCategoryMatch) && subCategoryMatch);

      if (temp) {
        // console.log("enterererrerererrerer");
        if (
          temp.findings.area._source.Kind === "country" ||
          temp.findings.area._source.kind === "country"
        ) {
          address.country = temp.findings.area._source.name;
          address.state = undefined;
          address.district = undefined;
          address.city = undefined;
          address.area = undefined;
        } else if (
          temp.findings.area._source.Kind === "state" ||
          temp.findings.area._source.kind === "state"
        ) {
          address.country = temp.findings.area._source.country;
          address.state = temp.findings.area._source.name;
          address.district = undefined;
          address.city = undefined;
          address.area = undefined;
        } else if (
          temp.findings.area._source.Kind === "district" ||
          temp.findings.area._source.kind === "district"
        ) {
          address.country = temp.findings.area._source.country;
          address.state = temp.findings.area._source.state;
          address.district = temp.findings.area._source.name;
          address.city = undefined;
          address.area = undefined;
        } else if (
          temp.findings.area._source.Kind === "city" ||
          temp.findings.area._source.kind === "city"
        ) {
          address.country = temp.findings.area._source.country;
          address.state = temp.findings.area._source.state;
          address.district = temp.findings.area._source.district;
          address.city = temp.findings.area._source.name;
          address.area = undefined;
        } else if (
          temp.findings.area._source.Kind === "area" ||
          temp.findings.area._source.kind === "area"
        ) {
          address.country = temp.findings.area._source.country;
          address.state = temp.findings.area._source.state;
          address.district = temp.findings.area._source.district;
          address.city = temp.findings.area._source.city;
          address.area = temp.findings.area._source.name;
        }
      }
      // console.log("asdasd: ", address);

      const hitMatch =
        (!isEmpty(businessMatch) &&
          businessMatch.hit.length && {
            ...businessMatch.hit[0]._source.address.area,

            hit: businessMatch.hit,
            hits: businessMatch.otherSimiliar
          }) ||
        (!isEmpty(subCategoryMatch) && {
          ...subCategoryMatch,
          ...address
        }) ||
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
