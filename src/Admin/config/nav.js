const items = {
  items: [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: "icon-speedometer",
      allowOnBreadCrumb: true,
      badge: {
        variant: "info",
        text: "NEW"
      }
    },
    {
      name: "Component 2",
      url: "/admin/component2",
      icon: "icon-speedometer",
      allowOnBreadCrumb: true
    }
  ]
};

items.routes = {};
items.items.forEach(item => {
  if (item.allowOnBreadCrumb) items.routes[item.url] = item.name;
});

export default items;
