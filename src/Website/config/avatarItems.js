export default [
  {
    className: "fa fa-dashboard",
    title: "Dashboard",
    id: "adminDashboard",
    badge: false,
    link: "/admin",
    group: "admin"
  },
  {
    className: "fa fa-dashboard",
    title: "Dashboard",
    id: "businessDashboard",
    badge: false,
    link: "/:businessName/dashboard",
    group: "business"
  },
  {
    className: "fa fa-dashboard",
    title: "Profile",
    id: "profile",
    badge: false,
    link: "/",
    group: "individual"
  },
  {
    className: "fa fa-bell",
    title: "Notifications",
    id: "notifications",
    badge: true,
    link: "/"
  },
  {
    className: "fa fa-lock",
    title: "Change Password",
    id: "changePassword",
    badge: false,
    link: "/"
  },
  {
    className: "fa fa-sign-out",
    title: "Sign out",
    id: "signOut",
    badge: false,
    link: "/logout"
  }
];
