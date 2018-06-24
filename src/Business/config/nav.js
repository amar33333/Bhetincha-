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
    {
      name: "Business Detail",
      url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-detail`,
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
          url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/ecommerce/products`,
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
