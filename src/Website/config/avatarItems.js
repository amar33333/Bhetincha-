import {
  USER_GROUP_BUSINESS,
  USER_GROUP_INDIVIDUAL,
  ROUTE_PARAMS_BUSINESS_NAME
} from "../../config/CONSTANTS";

export default [
  {
    className: "fa fa-dashboard",
    title: "Dashboard",
    id: "adminDashboard",
    badge: false,
    link: "/admin",
    group: "ADMIN"
  },
  {
    className: "fa fa-dashboard",
    title: "Dashboard",
    id: "businessDashboard",
    badge: false,
    link: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard`,
    group: USER_GROUP_BUSINESS
  },
  {
    className: "fa fa-dashboard",
    title: "Profile",
    id: "profile",
    badge: false,
    link: "/",
    group: USER_GROUP_INDIVIDUAL
  },
  {
    className: "fa fa-dashboard",
    title: "Minisite",
    id: "minisite",
    badge: false,
    link: `/${ROUTE_PARAMS_BUSINESS_NAME}`,
    group: USER_GROUP_BUSINESS
  },
  {
    className: "fa fa-bell",
    title: "Notifications",
    id: "notifications",
    badge: false,
    link: "/"
  },
  // {
  //   className: "fa fa-lock",
  //   title: "Change Password",
  //   id: "changePassword",
  //   badge: false,
  //   link: "/"
  // },
  {
    className: "fa fa-sign-out",
    title: "Sign out",
    id: "signOut",
    badge: false,
    link: "/logout"
  }
];
