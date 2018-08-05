import {
  // FETCH_EXSECTION_ATTRIBUTES_FULFILLED,
  FETCH_EXSECTION_SECTIONS_FULFILLED,
  CHANGE_ACTIVE_EXSECTION_SECTION,
  // FETCH_EXSECTION_SECTION_FULFILLED,
  // CREATE_EXSECTION_PROPERTY_SECTION_FULFILLED,
  // CREATE_EXSECTION_PROPERTY_SECTION_PENDING,
  // CREATE_EXSECTION_PROPERTY_SECTION_REJECTED
  CREATE_COREMEMBER_FULFILLED,
  CREATE_COREMEMBER_PENDING,
  CREATE_COREMEMBER_REJECTED,
  CREATE_MENUNAME_FULFILLED,
  CREATE_MENUNAME_PENDING,
  CREATE_MENUNAME_REJECTED,
  CREATE_FOODGROUP_FULFILLED,
  CREATE_FOODGROUP_PENDING,
  CREATE_FOODGROUP_REJECTED,
  FETCH_FOODGROUP_FULFILLED,
  FETCH_MENUNAME_FULFILLED,
  FETCH_FOODGROUP_PENDING,
  FETCH_FOODGROUP_ITEM_FULFILLED,
  FETCH_FOODGROUP_ITEM_PENDING,
  CREATE_FOODGROUP_ITEM_FULFILLED,
  CREATE_FOODGROUP_ITEM_PENDING,
  CREATE_FOODGROUP_ITEM_REJECTED,
  DELETE_FOODGROUP_ITEM_FULFILLED
} from "../actions/types";

const INITIAL_STATE = {
  sections: {},
  activeSection: "",
  isOpenSections: [],
  selectedSectionDetail: null,
  attributes: [],
  coreMemberLoading: false,
  coreMemberError: false,
  menuLoading: false,
  menuError: false,
  foodGroupLoading: false,
  foodGroupError: false,
  foodGroupItemLoading: false,
  foodGroupItemError: false,
  foodGroups: [],
  selectedMenuDetail: [],
  selectedFoodGroupItems: [],
  selectedFoodGroupName: "",
  selectedFoodGroupId: "",
  uid: ""
};

export default function(state = INITIAL_STATE, action) {
  let isOpenSections;

  switch (action.type) {
    case CREATE_COREMEMBER_FULFILLED:
      return { ...state, coreMemberLoading: false, coreMemberError: false };

    case CREATE_COREMEMBER_PENDING:
      return { ...state, coreMemberLoading: true, coreMemberError: false };

    case CREATE_COREMEMBER_REJECTED:
      return { ...state, coreMemberLoading: false, coreMemberError: true };

    case CREATE_MENUNAME_FULFILLED:
      return { ...state, menuLoading: false, menuError: false };

    case CREATE_MENUNAME_PENDING:
      return { ...state, menuLoading: true, menuError: false };

    case CREATE_MENUNAME_REJECTED:
      return { ...state, menuLoading: false, menuError: true };

    case CREATE_FOODGROUP_FULFILLED:
      return { ...state, foodGroupLoading: false, foodGroupError: false };

    case CREATE_FOODGROUP_PENDING:
      return { ...state, foodGroupLoading: true, foodGroupError: false };

    case CREATE_FOODGROUP_REJECTED:
      return { ...state, foodGroupLoading: false, foodGroupError: true };

    case FETCH_FOODGROUP_FULFILLED:
      return { ...state, foodGroups: action.payload.foodCategories };

    case FETCH_FOODGROUP_PENDING:
      return { ...state };

    case FETCH_FOODGROUP_ITEM_FULFILLED:
      return {
        ...state,
        selectedFoodGroupItems: action.payload.foods,
        selectedFoodGroupName: action.payload.name,
        selectedFoodGroupId: action.payload.foodCategoryID
      };

    case FETCH_FOODGROUP_ITEM_PENDING:
      return { ...state };

    case CREATE_FOODGROUP_ITEM_FULFILLED:
      return {
        ...state,
        foodGroupItemLoading: false,
        foodGroupItemError: false
      };

    case CREATE_FOODGROUP_ITEM_PENDING:
      return {
        ...state,
        foodGroupItemLoading: true,
        foodGroupItemError: false
      };

    case CREATE_FOODGROUP_ITEM_REJECTED:
      return {
        ...state,
        foodGroupItemLoading: false,
        foodGroupItemError: true
      };

    // case DELETE_FOODGROUP_ITEM_FULFILLED:
    //   return { ...state, uid:action.payload.uid };

    // case CREATE_EXSECTION_PROPERTY_SECTION_FULFILLED:
    //   return { ...state, propertyLoading: false, propertyError: false };

    // case CREATE_EXSECTION_PROPERTY_SECTION_PENDING:
    //   return { ...state, propertyLoading: true, propertyError: false };

    // case CREATE_EXSECTION_PROPERTY_SECTION_REJECTED:
    //   return { ...state, propertyLoading: false, propertyError: true };

    // case FETCH_EXSECTION_ATTRIBUTES_FULFILLED:
    //   return { ...state, attributes: action.payload };

    case FETCH_MENUNAME_FULFILLED:
      return { ...state, selectedMenuDetail: action.payload };

    case FETCH_EXSECTION_SECTIONS_FULFILLED:
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
      // console.log("I am invoked"); //ok
      //console.log({ ...state, isOpenSections, ...extra }); //ok
      return { ...state, isOpenSections, ...extra };

    // case FETCH_EXSECTION_SECTION_FULFILLED:
    //   return { ...state, selectedSectionDetail: action.payload };

    default:
      return state;
  }
}
