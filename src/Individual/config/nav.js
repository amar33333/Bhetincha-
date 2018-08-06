import { ROUTE_PARAMS_INDIVIDUAL_NAME } from "../../config/CONSTANTS";

const items = {
  items: [
    {
      name: "Dashboard",
      url: `/${ROUTE_PARAMS_INDIVIDUAL_NAME}/userdashboard/home`,
      icon: "icon-speedometer"
      // permission: "CAN_VIEW_DASHBOARD"
    },
    {
      name: "Personal Details",
      url: `/${ROUTE_PARAMS_INDIVIDUAL_NAME}/userdashboard/personal-details`,
      icon: "icon-speedometer"
      // permission: "CAN_VIEW_DASHBOARD"
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
