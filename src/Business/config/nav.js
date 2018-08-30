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
      name: "Change Slug",
      className: "joyride-slug",
      url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/change-slug`,
      icon: "fa fa-external-link"
      // permission: "CAN_VIEW_USERS"
    },
    {
      name: "General Info",
      icon: "fa fa-info-circle",
      // permission: "CAN_VIEW_USER",
      children: [
        {
          name: "Business Details",
          url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-details`,
          icon: "fa fa-info"
          // permission: "CAN_VIEW_USERS"
        },
        {
          name: "Logo & Cover Image",
          url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-logo-cover-image`,
          icon: "fa fa-picture-o"
          // permission: "CAN_VIEW_USERS"
        },

        {
          name: "About",
          url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-about`,
          icon: "fa fa-tag"
          // permission: "CAN_VIEW_USERS"
        },
        {
          name: "WorkingHour",
          url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-working-hour`,
          icon: "fa fa-calendar-check-o"
          // permission: "CAN_VIEW_USERS"
        }
      ]
    },
    {
      name: "Contact",
      icon: "fa fa-location-arrow",
      // permission: "CAN_VIEW_USER",
      children: [
        {
          name: "PrimaryAddress",
          url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-primary-address`,
          icon: "fa fa-map-marker"
          // permission: "CAN_VIEW_USERS"
        },
        {
          name: "BranchAddress",
          url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-branch-address`,
          icon: "fa fa-map-marker"
          // permission: "CAN_VIEW_USERS"
        }
      ]
    },
    {
      name: "Gallery",
      url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/gallery`,
      icon: "fa fa-picture-o"
      // permission: "CAN_VIEW_USER",
    },
    {
      name: "Social Links",
      url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/social-links`,
      icon: "fa fa-facebook-square"
      // permission: "CAN_VIEW_USER",
    },

    {
      name: "Ecommerce",
      url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/ecommerce`,
      icon: "fa fa-shopping-cart",
      // permission: "CAN_VIEW_USER",
      children: [
        {
          name: "Manage Products",
          url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/ecommerce/manage-products`,
          icon: "fa fa-reorder"
          // permission: "CAN_VIEW_USER"
        }
      ]
    },
    {
      name: "Sections",
      url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/section`,
      icon: "fa fa-users",
      // permission: "CAN_VIEW_USER",
      children: [
        {
          name: "Manage Sections",
          url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/section/manage-sections`,
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

items.routes = {
  ...items.routes,
  "/:x/dashboard": "Home",
  "/:x/dashboard/ecommerce/:x": "YProduct",
  "/:x/dashboard/ecommerce/:x/edit": "Edit",
  "/:x/dashboard/ecommerce/manage-products/:x": "XCategory Detail"
};

export default items;
