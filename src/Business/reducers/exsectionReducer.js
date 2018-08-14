import {
  FETCH_EXSECTION_SECTIONS_FULFILLED,
  CHANGE_ACTIVE_EXSECTION_SECTION,
  FETCH_EXSECTION_SECTION_ATTRIBUTES_FULFILLED,
  FETCH_PARENT_SECTION_LIST_BUSINESS_FULFILLED,
  CHANGE_ACTIVE_CHILD_EXSECTION,
  CHANGE_SELETED_SECTION_DETAILS_BUSINESS,
  //CHANGE_ACTIVE_PARENT_ADMIN_ID_EXSECTION_FULFILLED,
  RESET_SECTION_STATE,
  CHANGE_SELETED_SECTION_DETAILS_BUSINESS_DATA_FULFILLED,
  FETCH_EXSECTION_SECTION_ENTITY_EACH_PENDING,
  FETCH_EXSECTION_SECTION_ENTITY_EACH_FULFILLED,
  CHANGE_ACTIVE_PARENT_ASID_EXSECTION
} from "../actions/types";

import update from "immutability-helper";

const INITIAL_STATE = {
  sections: {},
  activeSection: "",
  isOpenSections: ["9b4623c4d6c24531a8f64e9673397cf1"],
  selectedSectionDetail: null,
  selectedSectionDetailBusiness: null,
  attributes: [],
  parentSection: {},
  activeChildren: {},
  sectionEntityDetail: null,
  activeParentASID: ""
};

export default function(state = INITIAL_STATE, action) {
  let isOpenSections;

  switch (action.type) {
    case FETCH_EXSECTION_SECTIONS_FULFILLED:
      return {
        ...state,
        sections: action.payload
      };

    case CHANGE_ACTIVE_EXSECTION_SECTION:
      //console.log("whats in the state", state);
      const extra = {};
      const uid = action.payload;
      isOpenSections = state.isOpenSections;

      let { activeSection } = state;
      // if (isOpenSections.includes(uid)) {
      //   isOpenSections = isOpenSections.filter(data => data !== uid);
      // } else {
      //   isOpenSections = [...isOpenSections, uid];
      // }
      if (activeSection !== uid) {
        extra.activeSection = uid;
      }
      //console.log(isOpenSections);

      return { ...state, isOpenSections, ...extra };

    case FETCH_EXSECTION_SECTION_ATTRIBUTES_FULFILLED:
      return {
        ...state,
        attributes: action.payload
      };

    case FETCH_PARENT_SECTION_LIST_BUSINESS_FULFILLED:
      return {
        ...state,
        parentSection: action.payload
      };

    case CHANGE_ACTIVE_CHILD_EXSECTION:
      //console.log("REducer reached", action.payload);
      return {
        ...state,
        activeChildren: action.payload
      };

    case CHANGE_ACTIVE_PARENT_ASID_EXSECTION:
      //console.log("Breached", action.payload);
      return {
        ...state,
        activeParentASID: action.payload
      };

    case CHANGE_SELETED_SECTION_DETAILS_BUSINESS:
      return {
        ...state,
        selectedSectionDetail: action.payload
      };

    case RESET_SECTION_STATE:
      return {
        ...state,
        parentSection: {}
      };

    case CHANGE_SELETED_SECTION_DETAILS_BUSINESS_DATA_FULFILLED:
      return {
        ...state,
        selectedSectionDetailBusiness: action.payload
      };

    case FETCH_EXSECTION_SECTION_ENTITY_EACH_FULFILLED:
      return { ...state, sectionEntityDetail: action.payload };

    case FETCH_EXSECTION_SECTION_ENTITY_EACH_PENDING:
      return { ...state, sectionEntityDetail: null };

    default:
      return state;
  }
}
