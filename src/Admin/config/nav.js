const items = {
  items: [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: "icon-speedometer",
      permission: "CAN_VIEW_DASHBOARD",
      badge: {
        variant: "info",
        text: "NEW"
      }
    },
    {
      title: true,
      name: "General Setup"
    },
    {
      name: "Areas",
      url: "/admin/settings",
      icon: "icon-settings",
      permission: "CAN_VIEW_SETTINGS"
    },
    {
      name: "Cities",
      url: "/admin/users",
      icon: "icon-user",
      permission: "CAN_VIEW_USERS"
    },
    {
      name: "Districts",
      url: "/admin/users",
      icon: "icon-user",
      permission: "CAN_VIEW_USERS"
    },
    {
      title: true,
      name: "Business"
    },
    {
      name: "Industry",
      url: "/admin/industry",
      icon: "icon-user",
      permission: "CAN_VIEW_USERS"
    },
    {
      name: "Categories",
      url: "/admin/categories",
      icon: "icon-user",
      permission: "CAN_VIEW_USERS"
    },
    {
      name: "Sub-Categories",
      url: "/admin/sub-categories",
      icon: "icon-user",
      permission: "CAN_VIEW_USERS"
    },
    {
      name: "Sections",
      url: "/admin/sections",
      icon: "icon-user",
      permission: "CAN_VIEW_USERS"
    },
    {
      title: true,
      name: "INDIVIDUAL"
    },
    {
      name: "Individual",
      url: "/admin/users",
      icon: "icon-user",
      permission: "CAN_VIEW_USERS"
    },
    {
      title: true,
      name: "LOGS"
    },
    {
      name: "Logs",
      url: "/admin/users",
      icon: "icon-user",
      permission: "CAN_VIEW_USERS"
    },
    {
      title: true,
      name: "TELE-CALLING"
    },
    {
      name: "Tele-Calling",
      url: "/admin/users",
      icon: "icon-user",
      permission: "CAN_VIEW_USERS"
    },
    {
      title: true,
      name: "Components"
    },
    {
      name: "Users",
      url: "/admin/users",
      icon: "icon-user",
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
      permission: "CAN_VIEW_SETTINGS"
    }
  ]
};

items.routes = {};
items.items.forEach(item => {
  // if (item.allowOnBreadCrumb)
  items.routes[item.url] = item.name;
});

export default items;
