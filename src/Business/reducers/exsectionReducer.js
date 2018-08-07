import {
  FETCH_EXSECTION_SECTIONS_FULFILLED,
  CHANGE_ACTIVE_EXSECTION_SECTION,
  FETCH_EXSECTION_SECTION_ATTRIBUTES_FULFILLED,
  FETCH_PARENT_SECTION_LIST_BUSINESS_FULFILLED
} from "../actions/types";

import update from "immutability-helper";

const INITIAL_STATE = {
  sections: {},
  activeSection: "",
  isOpenSections: [],
  selectedSectionDetail: null,
  attributes: [],
  showButton: true,
  parentSection: {}
};

export default function(state = INITIAL_STATE, action) {
  let isOpenSections;

  switch (action.type) {
    case FETCH_EXSECTION_SECTIONS_FULFILLED:
      return {
        ...state,
        sections: action.payload
      };

    case "ADD_SECTION_CHILD":
      console.log("FRIDAYYYYYYYYy");
      console.log({
        ...state
      });

      return update(state, {
        attributes: {
          attributes: { $set: action.payload }
        }
      });

    case CHANGE_ACTIVE_EXSECTION_SECTION:
      const extra = {};
      const uid = action.payload;
      isOpenSections = state.isOpenSections;

      let { activeSection } = state;
      if (isOpenSections.includes(uid)) {
        isOpenSections = isOpenSections.filter(data => data !== uid);
      } else {
        isOpenSections = [...isOpenSections, uid];
      }
      if (activeSection !== uid) {
        extra.activeSection = uid;
      }

      return { ...state, isOpenSections, ...extra };

    // case FETCH_EXSECTION_SECTION_FULFILLED:
    //   return { ...state, selectedSectionDetail: action.payload };

    case "CHANGE_ACTIVE_EXSECTION_SECTION_TEST":
      return state;

    case "CHANGE_ACTIVE_SECTION_BY_BUTTON":
      return { ...state };

    case "FETCH_EXSECTION_SECTION_P_FULFILLED_TEST":
      return {
        ...state
        //selectedSectionDetail: action.payload
      };

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

    case "FETCH_EXSECTION_SECTION_ATTRIBUTES_FULFILLED_TEST_TWO":
      return {
        ...state,
        attributes: action.payload
        //secondLevel: true
      };

    default:
      return state;
  }
}
