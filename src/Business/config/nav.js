import { ROUTE_PARAMS_BUSINESS_NAME } from "../../config/CONSTANTS";

const items = {
  items: [
    {
      name: "Dashboard",
      url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/home`,
      icon: "icon-speedometer"
      // permission: "CAN_VIEW_DASHBOARD"
    },
    {
      title: true,
      name: `${ROUTE_PARAMS_BUSINESS_NAME}`
    },
    // {
    //   name: "Business Detail",
    //   url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-detail`,
    //   icon: "fa fa-map-o"
    //   // permission: "CAN_VIEW_USERS"
    // },
    {
      name: "Business Details",
      url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-details`,
      icon: "fa fa-map-o"
      // permission: "CAN_VIEW_USERS"
    },
    {
      name: "PrimaryAddress",
      url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-primary-address`,
      icon: "fa fa-map-o"
      // permission: "CAN_VIEW_USERS"
    },
    {
      name: "BranchAddress",
      url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-branch-address`,
      icon: "fa fa-map-o"
      // permission: "CAN_VIEW_USERS"
    },
    {
      name: "Logo",
      url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-logo`,
      icon: "fa fa-map-o"
      // permission: "CAN_VIEW_USERS"
    },
    {
      name: "CoverImage",
      url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-cover-image`,
      icon: "fa fa-map-o"
      // permission: "CAN_VIEW_USERS"
    },
    {
      name: "About",
      url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-about`,
      icon: "fa fa-map-o"
      // permission: "CAN_VIEW_USERS"
    },
    {
      name: "WorkingHour",
      url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-working-hour`,
      icon: "fa fa-map-o"
      // permission: "CAN_VIEW_USERS"
    },
    {
      name: "Ecommerce",
      url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/ecommerce`,
      icon: "fa fa-users",
      // permission: "CAN_VIEW_USER",
      children: [
        {
          name: "Manage Products",
          url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/ecommerce/manage-products`,
          icon: "icon-user-follow"
          // permission: "CAN_VIEW_USER"
        }
      ]
    }
  ]
};

items.routes = {};
items.items.forEach(item => {
  if (item.children)
    item.children.forEach(innerItem => {
      items.routes[innerItem.url] = innerItem.name;
    });
  else if (item.url) items.routes[item.url] = item.name;
});

export default items;
