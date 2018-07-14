const items = {
  items: [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: "icon-speedometer"
      // permission: "CAN_VIEW_DASHBOARD"
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
      name: "General Setup",
      url: "/admin/countries",
      icon: "fa fa-users",
      permission: "CAN_VIEW_ECOMMERCE",
      children: [
        {
          name: "Countries",
          url: "/admin/countries",
          icon: "fa fa-map-o",
          permission: "CAN_VIEW_COUNTRY"
        },
        {
          name: "States",
          url: "/admin/states",
          icon: "fa fa-map-o",
          permission: "CAN_VIEW_STATE"
        },
        {
          name: "Districts",
          url: "/admin/districts",
          icon: "fa fa-map-o",
          permission: "CAN_VIEW_DISTRICT"
        },
        {
          name: "Cities",
          url: "/admin/cities",
          icon: "fa fa-map-pin",
          permission: "CAN_VIEW_CITY"
        },
        {
          name: "Areas",
          url: "/admin/areas",
          icon: "fa fa-map",
          permission: "CAN_VIEW_AREA"
        }
      ]
    },

    {
      title: true,
      name: "Business"
    },
    // {
    //   name: "Add Business",
    //   url: "/admin/add-business",
    //   icon: "fa fa-industry",
    //   permission: "CAN_ADD_BUSINESS"
    // },
    // {
    //   name: "Add Free Business",
    //   url: "/admin/add-free-business",
    //   icon: "fa fa-industry",
    //   permission: "CAN_ADD_BUSINESS"
    // },
    {
      name: "List Business",
      url: "/admin/list-business",
      icon: "fa fa-industry",
      permission: "CAN_VIEW_BUSINESS"
    },
    {
      name: "Assign Business",
      url: "/admin/business-assign",
      icon: "fa fa-industry",
      permission: "CAN_ADD_BUSINESS"
    },
    {
      name: "List App Business",
      url: "/admin/approve-app-business",
      icon: "fa fa-industry",
      permission: "CAN_VIEW_APP_BUSINESS"
    },
    {
      name: "Industry",
      url: "/admin/industry",
      icon: "fa fa-industry",
      permission: "CAN_VIEW_INDUSTRY"
    },
    {
      name: "Categories",
      url: "/admin/categories",
      icon: "fa fa-cube",
      permission: "CAN_VIEW_CATEGORY"
    },
    {
      name: "Sub-Categories",
      url: "/admin/sub-categories",
      icon: "fa fa-cubes",
      permission: "CAN_VIEW_SUB_CATEGORY"
    },
    {
      name: "Company Type",
      url: "/admin/company-type",
      icon: "fa fa-cubes",
      permission: "CAN_VIEW_COMPANY_TYPE"
    },
    {
      name: "Payment Method",
      url: "/admin/payment-method",
      icon: "fa fa-cubes",
      permission: "CAN_VIEW_PAYMENT_METHOD"
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
      permission: "CAN_VIEW_USER"
    },
    {
      title: true,
      name: "LOGS"
    },
    {
      name: "Logs",
      url: "/admin/users",
      icon: "fa fa-list",
      permission: "CAN_ACCESS_LOGS"
    },
    {
      title: true,
      name: "TELE-CALLING"
    },
    {
      name: "Tele-Calling",
      url: "/admin/tele-calling",
      icon: "fa fa-headphones",
      permission: "CAN_VIEW_USER"
    },
    {
      title: true,
      name: "Ecommerce"
    },
    {
      name: "Ecommerce",
      url: "/admin/ecommerce",
      icon: "fa fa-users",
      permission: "CAN_VIEW_ECOMMERCE",
      children: [
        {
          name: "Manage Categories",
          url: "/admin/ecommerce/categories",
          icon: "icon-user-follow",
          permission: "CAN_VIEW_ECOMMERCE_CATEGORIES"
        }
      ]
    },
    {
      title: true,
      name: "User Management"
    },
    {
      name: "Users",
      url: "/admin/users",
      icon: "fa fa-users",
      permission: "CAN_VIEW_USER",
      children: [
        {
          name: "Manage Users",
          url: "/admin/users/manage-users",
          icon: "icon-user-follow",
          permission: "CAN_VIEW_USER"
        },
        {
          name: "Groups",
          url: "/admin/users/groups",
          icon: "icon-bubbles",
          permission: "CAN_VIEW_GROUP"
        },
        {
          name: "Permissions",
          url: "/admin/users/permissions",
          icon: "icon-tag",
          permission: "CAN_ACCESS_PERMISSION"
        },
        {
          name: "Reset Password",
          url: "/admin/users/reset-password",
          icon: "icon-tag",
          permission: "CAN_ACCESS_PERMISSION"
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
      permission: "CAN_VIEW_GROUP",
      children: [
        {
          name: "Manage Social Links",
          url: "/admin/manage-social-links",
          icon: "icon-user-follow",
          permission: "CAN_VIEW_GROUP"
        }
      ]
    },
    {
      name: "Logout",
      url: "/logout",
      icon: "fa fa-sign-out"
      // permission: "CAN_LOGOUT"
    }
  ]
};

items.routes = {};
items.items.forEach(item => {
  if (item.children)
    item.children.forEach(innerItem => {
      items.routes[innerItem.url] = innerItem.name;
    });
  if (item.url) items.routes[item.url] = item.name;
});

items.routes = {
  ...items.routes,
  ...{
    "/admin/list-business/add-business": "Add Business",
    "/admin/list-business/add-free-business": "Add Free Business"
  }
};

export default items;
