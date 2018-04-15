export default [
  {
    className: "fa fa-dashboard",
    title: "Dashboard",
    id: "adminDashboard",
    badge: false,
    link: "/admin",
    group: "ADMIN"
  },
  {
    className: "fa fa-dashboard",
    title: "Dashboard",
    id: "businessDashboard",
    badge: false,
    link: "/:businessName/dashboard",
    group: "BUSINESS"
  },
  {
    className: "fa fa-dashboard",
    title: "Profile",
    id: "profile",
    badge: false,
    link: "/",
    group: "INDIVIDUAL"
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
