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
  CHANGE_ACTIVE_PARENT_ADMIN_EXSECTION,
  CHANGE_ROOT_SECTION_ADMIN
} from "../actions/types";

import update from "immutability-helper";

const INITIAL_STATE = {
  sectionsAdmin: {},
  activeSectionAdminId: "",
  rootSectionAdmin: {},
  isOpenSections: ["9b4623c4d6c24531a8f64e9673397cf1"],
  selectedSectionDetailAdmin: null,
  selectedSectionDetailBiz: null,
  attributes: [],
  parentSectionBiz: {},
  activeChildrenAdmin: null,
  sectionEntityDetailBiz: null,
  activeParentAdminId: ""
};

export default function(state = INITIAL_STATE, action) {
  let isOpenSections;

  switch (action.type) {
    case FETCH_EXSECTION_SECTIONS_FULFILLED:
      return {
        ...state,
        sectionsAdmin: action.payload
      };

    case CHANGE_ACTIVE_EXSECTION_SECTION:
      const extra = {};
      const uid = action.payload;
      isOpenSections = state.isOpenSections;

      let { activeSectionAdminId } = state;

      if (activeSectionAdminId !== uid) {
        extra.activeSectionAdminId = uid;
      }
      return { ...state, isOpenSections, ...extra };

    case "CHANGE_ACTIVE_EXSECTION_SECTION_BY_CLICK":
      const extra2 = {};
      const uid2 = action.payload;
      isOpenSections = state.isOpenSections;

      let activeSectionAdminIId = state.activeSectionAdminId;

      if (activeSectionAdminIId !== uid2) {
        extra2.activeSectionAdminId = uid2;
      }
      return { ...state, isOpenSections, ...extra2 };

    case FETCH_EXSECTION_SECTION_ATTRIBUTES_FULFILLED:
      return {
        ...state,
        attributes: action.payload
      };

    case FETCH_PARENT_SECTION_LIST_BUSINESS_FULFILLED:
      // if (
      //   state.rootSectionAdmin !== null &&
      //   state.activeSectionAdminId !== null
      // ) {
      //   console.log("state.rootSectionAdmin", state.rootSectionAdmin);
      //   console.log("state.activeSectionAdminId", state.activeSectionAdminId);
      //   if (state.rootSectionAdmin[uid] === activeSectionAdminId) {
      //     console.log("true");
      //   }
      // }
      return {
        ...state,
        parentSectionBiz: action.payload
      };

    case CHANGE_ACTIVE_CHILD_EXSECTION:
      return {
        ...state,
        activeChildrenAdmin: action.payload
      };

    case CHANGE_ROOT_SECTION_ADMIN:
      return {
        ...state,
        rootSectionAdmin: action.payload
      };

    case CHANGE_ACTIVE_PARENT_ADMIN_EXSECTION:
      return {
        ...state,
        activeParentAdminId: action.payload
      };

    case CHANGE_SELETED_SECTION_DETAILS_BUSINESS:
      return {
        ...state,
        selectedSectionDetailAdmin: action.payload
      };

    case RESET_SECTION_STATE:
      //  console.log({ ...state });

      return {
        ...state,
        parentSectionBiz: {}
      };

    case CHANGE_SELETED_SECTION_DETAILS_BUSINESS_DATA_FULFILLED:
      return {
        ...state,
        selectedSectionDetailBiz: action.payload
      };

    case FETCH_EXSECTION_SECTION_ENTITY_EACH_FULFILLED:
      return { ...state, sectionEntityDetailBiz: action.payload };

    case FETCH_EXSECTION_SECTION_ENTITY_EACH_PENDING:
      return { ...state, sectionEntityDetailBiz: null };

    default:
      return state;
  }
}
