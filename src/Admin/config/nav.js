const items = {
  items: [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: "icon-speedometer",
      permission: "CAN_VIEW_DASHBOARD"
      // badge: {
      //   variant: "info",
      //   text: "NEW"
      // }
    },
    {
      title: true,
      name: "General Setup"
    },
    {
      name: "Areas",
      url: "/admin/settings",
      icon: "fa fa-map",
      permission: "CAN_VIEW_SETTINGS"
    },
    {
      name: "Cities",
      url: "/admin/users",
      icon: "fa fa-map-pin",
      permission: "CAN_VIEW_USERS"
    },
    {
      name: "Districts",
      url: "/admin/users",
      icon: "fa fa-map-o",
      permission: "CAN_VIEW_USERS"
    },
    {
      title: true,
      name: "Business"
    },
    {
      name: "Industry",
      url: "/admin/industry",
      icon: "fa fa-industry",
      permission: "CAN_VIEW_USERS"
    },
    {
      name: "Categories",
      url: "/admin/categories",
      icon: "fa fa-cube",
      permission: "CAN_VIEW_USERS"
    },
    {
      name: "Sub-Categories",
      url: "/admin/sub-categories",
      icon: "fa fa-cubes",
      permission: "CAN_VIEW_USERS"
    },
    // {
    //   name: "Sections",
    //   url: "/admin/sections",
    //   icon: "fa fa-tasks",
    //   permission: "CAN_VIEW_USERS"
    // },
    {
      title: true,
      name: "INDIVIDUAL"
    },
    {
      name: "Individual",
      url: "/admin/users",
      icon: "fa fa-user",
      permission: "CAN_VIEW_USERS"
    },
    {
      title: true,
      name: "LOGS"
    },
    {
      name: "Logs",
      url: "/admin/users",
      icon: "fa fa-list",
      permission: "CAN_VIEW_USERS"
    },
    {
      title: true,
      name: "TELE-CALLING"
    },
    {
      name: "Tele-Calling",
      url: "/admin/users",
      icon: "fa fa-headphones",
      permission: "CAN_VIEW_USERS"
    },
    {
      title: true,
      name: "User Management"
    },
    {
      name: "Users",
      url: "/admin/users",
      icon: "fa fa-users",
      permission: "CAN_VIEW_USERS",
      children: [
        {
          name: "Manage Users",
          url: "/admin/users/manage-users",
          icon: "icon-user-follow",
          permission: "CAN_VIEW_USERS"
        },
        {
          name: "Groups",
          url: "/admin/users/groups",
          icon: "icon-bubbles",
          permission: "CAN_VIEW_GROUPS"
        },
        {
          name: "Permissions",
          url: "/admin/users/permissions",
          icon: "icon-tag",
          permission: "CAN_VIEW_PERMISSIONS"
        }
      ]
    },
    {
      title: true,
      name: "Extras"
    },
    {
      name: "Settings",
      url: "/admin/settings",
      icon: "icon-settings",
      permission: "CAN_VIEW_SETTINGS"
    },
    {
      name: "Logout",
      url: "/logout",
      icon: "fa fa-sign-out",
      permission: "CAN_LOGOUT"
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
