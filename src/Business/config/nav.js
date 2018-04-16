import { ROUTE_PARAMS_BUSINESS_NAME } from "../../config/CONSTANTS";

const items = {
  items: [
    {
      name: "Dashboard",
      url: `/${ROUTE_PARAMS_BUSINESS_NAME}/dashboard`,
      icon: "icon-speedometer",
      permission: "CAN_VIEW_DASHBOARD"
    },
    {
      title: true,
      name: `${ROUTE_PARAMS_BUSINESS_NAME}`
    },
    {
      name: "Business Detail",
      url: `/${ROUTE_PARAMS_BUSINESS_NAME}/business-detail`,
      icon: "fa fa-map-o",
      permission: "CAN_VIEW_USERS"
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
