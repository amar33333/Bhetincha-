import {
  FETCH_EXSECTION_SECTIONS_FULFILLED,
  CHANGE_ACTIVE_EXSECTION_SECTION,
  FETCH_EXSECTION_SECTION_ATTRIBUTES_FULFILLED,
  FETCH_PARENT_SECTION_LIST_BUSINESS_FULFILLED,
  CHANGE_ACTIVE_CHILD_EXSECTION,
  CHANGE_SELETED_SECTION_DETAILS_BUSINESS,
  RESET_SECTION_STATE,
  CHANGE_SELETED_SECTION_DETAILS_BUSINESS_DATA_FULFILLED,
  FETCH_EXSECTION_SECTION_ENTITY_EACH_PENDING,
  FETCH_EXSECTION_SECTION_ENTITY_EACH_FULFILLED,
  CHANGE_ACTIVE_PARENT_ADMIN_EXSECTION,
  CHANGE_ROOT_SECTION_ADMIN,
  CHANGE_ACTIVE_EXSECTION_SECTION_BY_CLICK,
  INITIALIZE_TOP_SECTION_ADMIN_ID,
  PARENT_SECTION_BIZ_FLAG,
  FETCH_EXSECTION_SECTION_ATTRIBUTES_PENDING
} from "../actions/types";

const INITIAL_STATE = {
  sectionsAdmin: null, // all the sections in our app
  activeSectionAdminId: "", // currently clicked active section admin id
  topSectionAdmin: null, // this holds the top section information of any new section created in admin
  isOpenSections: [],
  selectedSectionDetailAdmin: null,
  selectedSectionDetailBiz: null,
  attributes: [], // holding attributes type according to context
  parentSectionBiz: null,
  activeChildrenAdmin: null,
  sectionEntityDetailBiz: null, //active section detail of business
  activeParentAdminId: "",
  rootNodeAdminId: "", //this is the root node id which has no parent, in our app it is static section neo4j node
  parentSectionBizFlag: true,
  loading: false
};

export default function(state = INITIAL_STATE, action) {
  let isOpenSections;

  switch (action.type) {
    case INITIALIZE_TOP_SECTION_ADMIN_ID:
      return {
        ...state,
        rootNodeAdminId: action.payload,
        isOpenSections: [action.payload]
      };
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

    case CHANGE_ACTIVE_EXSECTION_SECTION_BY_CLICK:
      const extra2 = {};
      const uid2 = action.payload;
      isOpenSections = state.isOpenSections;

      let activeSectionAdminIId = state.activeSectionAdminId;

      if (activeSectionAdminIId !== uid2) {
        extra2.activeSectionAdminId = uid2;
      }
      return { ...state, isOpenSections, ...extra2 };

    case FETCH_EXSECTION_SECTION_ATTRIBUTES_PENDING:
      return {
        ...state,
        loading: true
      };

    case FETCH_EXSECTION_SECTION_ATTRIBUTES_FULFILLED:
      return {
        ...state,
        attributes: action.payload,
        loading: false
      };

    case FETCH_PARENT_SECTION_LIST_BUSINESS_FULFILLED:
      return {
        ...state,
        parentSectionBiz: action.payload
      };

    case "FETCH_PARENT_SECTION_LIST_ADMIN_FULFILLED":
      return {
        ...state,
        activeParentAdminId: action.payload
      };

    case CHANGE_ACTIVE_CHILD_EXSECTION:
      return {
        ...state,
        activeChildrenAdmin: action.payload
      };

    case CHANGE_ROOT_SECTION_ADMIN:
      return {
        ...state,
        topSectionAdmin: action.payload
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
      return {
        ...state,
        parentSectionBiz: null,
        parentSectionBizFlag: true
        //changed from {} to nullPARENT_SECTION_BIZ_FLAG
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

    case PARENT_SECTION_BIZ_FLAG:
      return { ...state, parentSectionBizFlag: action.payload };

    default:
      return state;
  }
}
