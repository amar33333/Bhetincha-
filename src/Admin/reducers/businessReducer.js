import {
  CREATE_COMPANY_TYPE_FULFILLED,
  CREATE_COMPANY_TYPE_PENDING,
  CREATE_COMPANY_TYPE_REJECTED,
  EDIT_COMPANY_TYPE_FULFILLED,
  EDIT_COMPANY_TYPE_PENDING,
  EDIT_COMPANY_TYPE_REJECTED,
  CREATE_PAYMENT_METHODS_FULFILLED,
  CREATE_PAYMENT_METHODS_PENDING,
  CREATE_PAYMENT_METHODS_REJECTED,
  EDIT_PAYMENT_METHOD_FULFILLED,
  EDIT_PAYMENT_METHOD_PENDING,
  EDIT_PAYMENT_METHOD_REJECTED,
  FETCH_PAYMENT_METHODS_FULFILLED,
  FETCH_PAYMENT_METHODS_REJECTED,
  FETCH_PAYMENT_METHODS_PENDING,
  FETCH_COMPANY_TYPE_FULFILLED,
  FETCH_COMPANY_TYPE_REJECTED,
  FETCH_COMPANY_TYPE_PENDING,
  FETCH_BUSINESS_FULFILLED,
  FETCH_BUSINESS_PENDING,
  FETCH_BUSINESS_REJECTED,
  FETCH_BUSINESS_EACH_FULFILLED,
  FETCH_BUSINESS_EACH_REJECTED,
  FETCH_BUSINESS_EACH_PENDING,
  EDIT_BUSINESS_FULFILLED,
  EDIT_BUSINESS_PENDING,
  EDIT_BUSINESS_REJECTED,
  TOGGLE_EDIT,
  TOGGLE_COMPANY_TYPE_EDIT_MODAL,
  TOGGLE_PAYMENT_METHOD_EDIT_MODAL,
  FETCH_APP_BUSINESS_FULFILLED,
  FETCH_APP_BUSINESS_REJECTED,
  FETCH_APP_BUSINESS_PENDING,
  FETCH_APP_BUSINESS_EACH_FULFILLED,
  FETCH_APP_BUSINESS_EACH_REJECTED,
  FETCH_APP_BUSINESS_EACH_PENDING,
  FETCH_ASSIGN_BUSINESS_FULFILLED,
  FETCH_ASSIGN_BUSINESS_REJECTED,
  FETCH_ASSIGN_BUSINESS_PENDING,
  FETCH_SALES_USERS_FULFILLED,
  FETCH_SALES_USERS_PENDING,
  FETCH_SALES_USERS_REJECTED,
  FETCH_ASSIGNED_PATH_PENDING,
  FETCH_ASSIGNED_PATH_FULFILLED,
  FETCH_ASSIGNED_PATH_REJECTED,
  CREATE_ASSIGNED_PATH_FULFILLED,
  CREATE_ASSIGNED_PATH_PENDING,
  CREATE_ASSIGNED_PATH_REJECTED,
  FETCH_BRANCH_EACH_FULFILLED,
  FETCH_BRANCH_EACH_PENDING,
  FETCH_BRANCH_EACH_REJECTED,
  FETCH_BUSINESS_BRANCH_FULFILLED,
  FETCH_BUSINESS_BRANCH_PENDING,
  FETCH_BUSINESS_BRANCH_REJECTED,
  CREATE_BRANCH_FULFILLED,
  CREATE_BRANCH_REJECTED,
  CREATE_BRANCH_PENDING,
  EDIT_BRANCH_EACH_FULFILLED,
  EDIT_BRANCH_EACH_PENDING,
  EDIT_BRANCH_EACH_REJECTED,
  CREATE_VERIFIED_BUSINESS_PENDING,
  CREATE_VERIFIED_BUSINESS_FULFILLED,
  CREATE_VERIFIED_BUSINESS_REJECTED,
  UNMOUNT_BRANCH,
  UNMOUNT_PAYMENT_METHOD,
  UNMOUNT_COMPANY_TYPE,
  RESET_PAYMENT_COMPANY_ERRORS,
  CREATE_SOCIAL_LINK_URL_FULFILLED,
  CREATE_SOCIAL_LINK_URL_PENDING,
  CREATE_SOCIAL_LINK_URL_REJECTED,
  FETCH_SOCIAL_LINK_URL_FULFILLED,
  FETCH_SOCIAL_LINK_URL_PENDING,
  FETCH_SOCIAL_LINK_URL_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  businessVerifyLoading: false,
  statusClass: "",
  EDIT: false,

  company_types: [],
  companyTypesFetchLoading: false,
  companyTypeError: false,
  companyTypeLoading: false,

  payment_methods: [],
  paymentMethodsFetchLoading: false,
  paymentMethodError: false,
  paymentMethodLoading: false,

  businesses: [],
  pages: 1,
  fetchLoading: false,
  businessGet: false,
  rowCount: 0,

  appBusinesses: [],
  pagesAppBusiness: 1,
  fetchAppBusinessLoading: false,
  // businessGet: false,
  rowCountAppBusiness: 0,

  assignBusinesses: [],
  pagesAssignBusiness: 1,
  fetchAssignBusinessLoading: false,
  // businessGet: false,
  rowCountAssignBusiness: 0,

  companyTypeEditModal: false,
  paymentMethodEditModal: false,
  salesUser: [],

  assignedPathLoading: false,
  assignedPathError: false,

  businessData: null,
  branch: null,
  businessBranchData: [],
  branchCreateEditErrors: null,
  paymentCompanyErrors: null,
  paymentCompanyEditErrors: null,
  social_link_error: null,

  social_url_links: [],
  socialUrlFetchLoading: false,
  socialUrlLoading: false,
  socialUrlError: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SOCIAL_LINK_URL_PENDING:
      return {
        ...state,
        socialUrlFetchLoading: true
      };
    case FETCH_SOCIAL_LINK_URL_REJECTED:
      return {
        ...state,
        socialUrlFetchLoading: false
      };
    case FETCH_SOCIAL_LINK_URL_FULFILLED:
      return {
        ...state,
        socialUrlFetchLoading: false,
        social_url_links: action.payload.map((url, i) => ({
          ...url,
          s_no: i + 1
        }))
      };

    case CREATE_SOCIAL_LINK_URL_PENDING:
      return {
        ...state,
        socialUrlLoading: true,
        socialUrlError: false
      };
    case CREATE_SOCIAL_LINK_URL_REJECTED:
      return {
        ...state,
        socialUrlLoading: false,
        socialUrlError: true,
        social_link_error: action.payload
      };
    case CREATE_SOCIAL_LINK_URL_FULFILLED:
      return {
        ...state,
        socialUrlLoading: false,
        socialUrlError: false,
        social_link_error: null
      };

    case RESET_PAYMENT_COMPANY_ERRORS:
      return {
        ...state,
        paymentCompanyErrors: null,
        paymentCompanyEditErrors: null
      };

    case EDIT_BRANCH_EACH_PENDING:
      return {
        ...state,
        fetchLoading: true
      };
    case EDIT_BRANCH_EACH_REJECTED:
      return {
        ...state,
        fetchLoading: false,
        branchCreateEditErrors: action.payload
      };
    case EDIT_BRANCH_EACH_FULFILLED:
      return {
        ...state,
        fetchLoading: false,
        branchCreateEditErrors: null
      };

    case CREATE_BRANCH_PENDING:
      return {
        ...state,
        fetchLoading: true
      };
    case CREATE_BRANCH_REJECTED:
      return {
        ...state,
        fetchLoading: false,
        branchCreateEditErrors: action.payload
      };
    case CREATE_BRANCH_FULFILLED:
      return {
        ...state,
        fetchLoading: false,
        branchCreateEditErrors: null
      };

    case FETCH_BUSINESS_BRANCH_PENDING:
      return { ...state, fetchLoading: true };
    case FETCH_BUSINESS_BRANCH_REJECTED:
      return { ...state, fetchLoading: false };
    case FETCH_BUSINESS_BRANCH_FULFILLED:
      return {
        ...state,
        businessBranchData: action.payload
      };

    case FETCH_BRANCH_EACH_PENDING:
      return { ...state, fetchLoading: true };
    case FETCH_BRANCH_EACH_REJECTED:
      return { ...state, fetchLoading: false };
    case FETCH_BRANCH_EACH_FULFILLED:
      return {
        ...state,
        branch: action.payload
      };

    case FETCH_ASSIGNED_PATH_PENDING:
      return { ...state, fetchLoading: true };
    case FETCH_ASSIGNED_PATH_REJECTED:
      return { ...state, fetchLoading: false };
    case FETCH_ASSIGNED_PATH_FULFILLED:
      return {
        ...state,
        assignedPaths: action.payload
      };

    case FETCH_SALES_USERS_PENDING:
      return { ...state, fetchLoading: true };
    case FETCH_SALES_USERS_REJECTED:
      return { ...state, fetchLoading: false };
    case FETCH_SALES_USERS_FULFILLED:
      return {
        ...state,
        salesUsers: action.payload
      };

    case FETCH_BUSINESS_PENDING:
      return { ...state, fetchLoading: true };
    case FETCH_BUSINESS_REJECTED:
      return { ...state, fetchLoading: false };
    case FETCH_BUSINESS_FULFILLED:
      return {
        ...state,
        fetchLoading: false,
        businesses: action.payload.data,
        pages: action.payload.pages,
        rowCount: action.payload.rowCount
      };

    case FETCH_APP_BUSINESS_PENDING:
      return { ...state, fetchAppBusinessLoading: true };
    case FETCH_APP_BUSINESS_REJECTED:
      return { ...state, fetchAppBusinessLoading: false };
    case FETCH_APP_BUSINESS_FULFILLED:
      return {
        ...state,
        fetchAppBusinessLoading: false,
        appBusinesses: action.payload.data,
        pagesAppBusiness: action.payload.pages,
        rowCountAppBusiness: action.payload.rowCount
      };

    case FETCH_ASSIGN_BUSINESS_PENDING:
      return { ...state, fetchAssignBusinessLoading: true };
    case FETCH_ASSIGN_BUSINESS_REJECTED:
      return { ...state, fetchAssignBusinessLoading: false };
    case FETCH_ASSIGN_BUSINESS_FULFILLED:
      return {
        ...state,
        fetchAssignBusinessLoading: false,
        assignBusinesses: action.payload.data,
        pagesAssignBusiness: action.payload.pages,
        rowCountAssignBusiness: action.payload.rowCount
      };

    case EDIT_BUSINESS_PENDING:
      return { ...state, fetchLoading: true, businessGet: true };
    case EDIT_BUSINESS_REJECTED:
      return {
        ...state,
        fetchLoading: false,
        businessGet: false,
        businessCreateErrors: action.payload
      };
    case EDIT_BUSINESS_FULFILLED:
      return {
        ...state,
        fetchLoading: false,
        businessGet: true,
        editBusinessSuccess: action.payload,
        businessCreateErrors: null
      };

    case EDIT_PAYMENT_METHOD_PENDING:
      return {
        ...state,
        paymentMethodLoading: true,
        paymentMethodError: false
      };
    case EDIT_PAYMENT_METHOD_FULFILLED:
      return {
        ...state,
        paymentMethodLoading: false,
        paymentMethodError: false,
        paymentCompanyEditErrors: null
      };
    case EDIT_PAYMENT_METHOD_REJECTED:
      return {
        ...state,
        paymentMethodLoading: false,
        paymentMethodError: true,
        paymentCompanyEditErrors: action.payload
      };

    case CREATE_VERIFIED_BUSINESS_PENDING:
      return { ...state, businessVerifyLoading: true };

    case CREATE_VERIFIED_BUSINESS_REJECTED:
      return {
        ...state,
        businessVerifyLoading: false
      };
    case CREATE_VERIFIED_BUSINESS_FULFILLED:
      return {
        ...state,
        businessVerifyLoading: false
      };

    case FETCH_BUSINESS_EACH_PENDING:
      return { ...state, fetchLoading: true, businessGet: true };
    case FETCH_BUSINESS_EACH_REJECTED:
      return { ...state, fetchLoading: false, businessGet: false };
    case FETCH_BUSINESS_EACH_FULFILLED:
      return {
        ...state,
        businessData: action.payload,
        fetchLoading: false,
        businessGet: false
      };

    case FETCH_APP_BUSINESS_EACH_PENDING:
      return { ...state, fetchLoading: true, businessGet: true };
    case FETCH_APP_BUSINESS_EACH_REJECTED:
      return { ...state, fetchLoading: false, businessGet: false };
    case FETCH_APP_BUSINESS_EACH_FULFILLED:
      return {
        ...state,
        appBusinessData: action.payload,
        fetchLoading: false,
        businessGet: false
      };

    case CREATE_PAYMENT_METHODS_PENDING:
      return {
        ...state,
        paymentMethodLoading: true,
        paymentMethodError: false
      };
    case CREATE_PAYMENT_METHODS_FULFILLED:
      return {
        ...state,
        paymentMethodLoading: false,
        paymentMethodError: false,
        paymentCompanyErrors: null
      };
    case CREATE_PAYMENT_METHODS_REJECTED:
      return {
        ...state,
        paymentMethodLoading: false,
        paymentMethodError: true,
        paymentCompanyErrors: action.payload
      };

    case FETCH_PAYMENT_METHODS_PENDING:
      return { ...state, paymentMethodsFetchLoading: true };
    case FETCH_PAYMENT_METHODS_FULFILLED:
      return {
        ...state,
        payment_methods: action.payload.map((paymentMethod, i) => ({
          ...paymentMethod,
          s_no: i + 1
        })),
        paymentMethodsFetchLoading: false
      };
    case FETCH_PAYMENT_METHODS_REJECTED:
      return { ...state, paymentMethodsFetchLoading: false };

    case UNMOUNT_PAYMENT_METHOD:
      return { ...state, payment_methods: [] };

    case CREATE_COMPANY_TYPE_PENDING:
      return {
        ...state,
        companyTypeLoading: true,
        companyTypeError: false
      };
    case CREATE_COMPANY_TYPE_FULFILLED:
      return {
        ...state,
        companyTypeLoading: false,
        companyTypeError: false,
        paymentCompanyErrors: null
      };
    case CREATE_COMPANY_TYPE_REJECTED:
      return {
        ...state,
        companyTypeLoading: false,
        companyTypeError: true,
        paymentCompanyErrors: action.payload
      };

    case EDIT_COMPANY_TYPE_PENDING:
      return {
        ...state,
        companyTypeLoading: true,
        companyTypeError: false
      };
    case EDIT_COMPANY_TYPE_FULFILLED:
      return {
        ...state,
        companyTypeLoading: false,
        companyTypeError: false,
        paymentCompanyEditErrors: null
      };
    case EDIT_COMPANY_TYPE_REJECTED:
      return {
        ...state,
        companyTypeLoading: false,
        companyTypeError: true,
        paymentCompanyEditErrors: action.payload
      };

    case FETCH_COMPANY_TYPE_PENDING:
      return { ...state, companyTypesFetchLoading: true };
    case FETCH_COMPANY_TYPE_FULFILLED:
      return {
        ...state,
        company_types: action.payload.map((companyType, i) => ({
          ...companyType,
          s_no: i + 1
        })),
        companyTypesFetchLoading: false
      };
    case FETCH_COMPANY_TYPE_REJECTED:
      return { ...state, companyTypesFetchLoading: false };

    case UNMOUNT_COMPANY_TYPE:
      return { ...state, company_types: [] };

    case UNMOUNT_BRANCH:
      return { ...state, branch: null };

    case TOGGLE_EDIT:
      return { ...state, EDIT: action.payload, loading: false };

    case TOGGLE_COMPANY_TYPE_EDIT_MODAL:
      return {
        ...state,
        companyTypeEditModal: !state.companyTypeEditModal,
        companyTypeEditData: action.payload
      };

    case TOGGLE_PAYMENT_METHOD_EDIT_MODAL:
      return {
        ...state,
        paymentMethodEditModal: !state.paymentMethodEditModal,
        paymentMethodEditData: action.payload
      };

    case CREATE_ASSIGNED_PATH_PENDING:
      return {
        ...state,
        assignedPathLoading: true,
        assignedPathError: false
      };
    case CREATE_ASSIGNED_PATH_FULFILLED:
      return {
        ...state,
        assignedPathLoading: false,
        assignedPathError: false
      };
    case CREATE_ASSIGNED_PATH_REJECTED:
      return {
        ...state,
        assignedPathLoading: false,
        assignedPathError: true
      };

    default:
      return state;
  }
}
