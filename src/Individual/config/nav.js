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
      icon: "fa fa-info-circle"
      // permission: "CAN_VIEW_DASHBOARD"
    },
    {
      name: "Education",
      url: `/${ROUTE_PARAMS_INDIVIDUAL_NAME}/userdashboard/education-details`,
      icon: "fa fa-graduation-cap"
      // permission: "CAN_VIEW_DASHBOARD"
    },
    {
      name: "Experience Details",
      url: `/${ROUTE_PARAMS_INDIVIDUAL_NAME}/userdashboard/experience-details`,
      icon: "fa fa-lightbulb-o"
      // permission: "CAN_VIEW_DASHBOARD"
    },
    {
      name: "Interests",
      url: `/${ROUTE_PARAMS_INDIVIDUAL_NAME}/userdashboard/interests`,
      icon: "fa fa-tags"
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

items.routes = {
  ...items.routes,
  "/:x/userdashboard": "Home"
};

export default items;
