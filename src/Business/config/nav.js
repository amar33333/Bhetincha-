const items = {
  items: [
    {
      name: "Dashboard",
      url: "/:businessName/dashboard",
      icon: "icon-speedometer",
      permission: "CAN_VIEW_DASHBOARD"
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
