import {
  FETCH_EXSECTION_ATTRIBUTES_FULFILLED,
  FETCH_EXSECTION_SECTIONS_FULFILLED,
  CHANGE_ACTIVE_EXSECTION_SECTION,
  FETCH_EXSECTION_SECTION_FULFILLED,
  CREATE_EXSECTION_PROPERTY_SECTION_FULFILLED,
  CREATE_EXSECTION_PROPERTY_SECTION_PENDING,
  CREATE_EXSECTION_PROPERTY_SECTION_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  sections: {},
  activeSection: "",
  isOpenSections: [],
  selectedSectionDetail: null,
  attributes: [],
  propertyLoading: false,
  propertyError: false
};

export default function(state = INITIAL_STATE, action) {
  let isOpenSections;

  switch (action.type) {
    case CREATE_EXSECTION_PROPERTY_SECTION_FULFILLED:
      return { ...state, propertyLoading: false, propertyError: false };

    case CREATE_EXSECTION_PROPERTY_SECTION_PENDING:
      return { ...state, propertyLoading: true, propertyError: false };

    case CREATE_EXSECTION_PROPERTY_SECTION_REJECTED:
      return { ...state, propertyLoading: false, propertyError: true };

    case FETCH_EXSECTION_ATTRIBUTES_FULFILLED:
      // console.log("consoling attributes array", action.payload);
      return { ...state, attributes: action.payload };

    case FETCH_EXSECTION_SECTIONS_FULFILLED:
      //console.log("consoling sections object", action.payload);
      return {
        ...state,
        sections: action.payload
      };

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

    case FETCH_EXSECTION_SECTION_FULFILLED:
      return { ...state, selectedSectionDetail: action.payload };

    default:
      return state;
  }
}
