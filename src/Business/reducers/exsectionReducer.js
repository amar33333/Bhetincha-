import {
  FETCH_EXSECTION_SECTIONS_FULFILLED,
  CHANGE_ACTIVE_EXSECTION_SECTION,
  FETCH_EXSECTION_SECTION_ATTRIBUTES_FULFILLED,
  FETCH_PARENT_SECTION_LIST_BUSINESS_FULFILLED,
  CHANGE_ACTIVE_CHILD_EXSECTION,
  CHANGE_SELETED_SECTION_DETAILS_BUSINESS,
  RESET_SECTION_STATE,
  CHANGE_SELETED_SECTION_DETAILS_BUSINESS_DATA_FULFILLED,
  FETCH_EXSECTION_SUB_SECTION_DATA_EACH_PENDING,
  FETCH_EXSECTION_SUB_SECTION_DATA_EACH_FULFILLED,
  CHANGE_ACTIVE_PARENT_ADMIN_EXSECTION,
  CHANGE_ROOT_SECTION_ADMIN,
  CHANGE_ACTIVE_EXSECTION_SECTION_BY_CLICK,
  INITIALIZE_TOP_SECTION_ADMIN_ID,
  PARENT_SECTION_BIZ_FLAG,
  FETCH_BUSINESS_CAT_DETAILS_FULFILLED,
  FETCH_BUSINESS_CAT_DETAILS_PENDING,
  FETCH_BUSINESS_CAT_DETAILS_REJECTED,
  FETCH_CATEGORY_EACH_FULFILLED,
  FETCH_CATEGORY_EACH_PENDING,
  FETCH_CATEGORY_EACH_REJECTED,
  FETCH_CATEGORY_SECTION_DATA,
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
  subSectionDataDetailBiz: null, //active section detail of business
  activeParentAdminId: "",
  activeParentAdmin: null,
  rootNodeAdminId: "", //this is the root node id which has no parent, in our app it is static section neo4j node
  parentSectionBizFlag: true,
  loading: false,
  businessSection: []
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
        activeParentAdminId: action.payload,
        activeParentAdmin: action.parentSectionAdmin
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

    case FETCH_EXSECTION_SUB_SECTION_DATA_EACH_FULFILLED:
      return { ...state, subSectionDataDetailBiz: action.payload };

    case FETCH_EXSECTION_SUB_SECTION_DATA_EACH_PENDING:
      return { ...state, subSectionDataDetailBiz: null };

    case PARENT_SECTION_BIZ_FLAG:
      return { ...state, parentSectionBizFlag: action.payload };

    // case FETCH_BUSINESS_CAT_DETAILS_PENDING:
    //   //return { ...state, fetchLoading: true, businessGet: true };
    //   return {
    //     ...state,
    //     catIds: action.payload,
    //     businessGet: false,
    //     fetchLoading: false
    //   };
    // case FETCH_BUSINESS_CAT_DETAILS_REJECTED:
    //   return { ...state, fetchLoading: false, businessGet: false };
    // case FETCH_BUSINESS_CAT_DETAILS_FULFILLED:
    //   //console.log("details: ", action.payload);
    //   return {
    //     ...state,
    //     catIds: action.payload,
    //     businessGet: false,
    //     fetchLoading: false
    //   };

    case FETCH_CATEGORY_EACH_PENDING:
      return { ...state, loading: true };

    case FETCH_CATEGORY_EACH_FULFILLED:
      return {
        ...state,
        categoryData: state.categoryData
          ? [...state.categoryData, action.payload]
          : [action.payload],
        loading: false
      };

    case FETCH_CATEGORY_EACH_REJECTED:
      return { ...state, loading: false };

    case FETCH_CATEGORY_SECTION_DATA:
      //console.log("SECTIONS IN REDUCER : ", action.payload);
      //console.log("SECTIONS Length IN REDUCER : ", action.payload.length);
      return { ...state, businessSection: action.payload, loading: false };

    default:
      return state;
  }
}
