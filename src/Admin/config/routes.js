import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import {
  Dashboard,
  ManageUsers,
  Groups,
  Permissions,
  Settings,
  SocialLinks,
  AddUser,
  Industry,
  Categories,
  SubCategories,
  Areas,
  Cities,
  Countries,
  Districts,
  States,
  CompanyType,
  PaymentMethod,
  BusinessAdminDetail,
  BusinessList,
  BusinessEdit,
  AppBusinessList,
  AppBusinessReview,
  BusinessAssign,
  TeleCalling,
  ManageBranchs,
  AddBranch,
  ResetPassword,
  ImproveListings,
  CampaignSearchPlaceholder,
  SocialUrlLinks,
  SubscriptionPackage
} from "../views";

import { ManageCategories } from "../views/Ecommerce";

import { ManageSections } from "../views/Exsection";

import CustomRoute from "../../Common/utils/CustomRoute";

class AdminRoute extends Component {
  render() {
    // const MATCH_URL = this.props.match.url;
    return (
      <Switch>
        <Route path="/admin/dashboard" name="Dashboard" component={Dashboard} />
        {/* {this.getPermissionRoutes(permissions_set)} */}
        <CustomRoute
          path="/admin/countries"
          name="Countries"
          component={Countries}
          permission="CAN_VIEW_COUNTRY"
        />
        <CustomRoute
          path="/admin/areas"
          name="Industry"
          component={Areas}
          permission="CAN_VIEW_AREA"
        />
        <CustomRoute
          path="/admin/cities"
          name="Cities"
          component={Cities}
          permission="CAN_VIEW_CITY"
        />
        <CustomRoute
          path="/admin/districts"
          name="Districts"
          component={Districts}
          permission="CAN_VIEW_DISTRICT"
        />
        <CustomRoute
          path="/admin/states"
          name="States"
          component={States}
          permission="CAN_VIEW_STATE"
        />
        <CustomRoute
          path="/admin/list-business/add-business"
          name="Add Business"
          component={props => (
            <BusinessAdminDetail
              {...this.props}
              requiredParams={{
                country: true,
                state: true,
                district: true,
                city: true,
                area: true,
                contactPerson: true
              }}
            />
          )}
          permission="CAN_ADD_BUSINESS"
        />
        <CustomRoute
          path="/admin/list-business/add-free-business"
          name="Add Free Business"
          component={props => (
            <BusinessAdminDetail
              {...this.props}
              requiredParams={{
                country: false,
                state: false,
                district: false,
                city: false,
                area: false,
                contactPerson: false
              }}
            />
          )}
          permission="CAN_ADD_BUSINESS_FREE"
        />
        <CustomRoute
          path="/admin/business-assign"
          name="Assign Business"
          component={BusinessAssign}
          permission="CAN_VIEW_BUSINESS_ASSIGN"
        />
        <CustomRoute
          path="/admin/approve-app-business/:businessSlug/review"
          name="Review App Business"
          component={AppBusinessReview}
          permission="CAN_EDIT_BUSINESS_APP"
        />
        <CustomRoute
          path="/admin/list-business/:businessSlug/edit"
          name="Edit Business"
          component={BusinessEdit}
          permission="CAN_EDIT_BUSINESS"
        />
        <CustomRoute
          path="/admin/list-business/:businessSlug/manage-branchs/add-branch"
          name="Add Branch Address"
          component={AddBranch}
          permission="CAN_ADD_BRANCH"
        />
        <Route
          path="/admin/list-business/:businessSlug/manage-branchs/:id/edit-branch"
          name="Edit Branch Address"
          component={AddBranch}
          permission="CAN_EDIT_BRANCH"
        />
        <CustomRoute
          path="/admin/list-business/:businessSlug/manage-branchs"
          name="Manage Branch Address"
          component={ManageBranchs}
          permission="CAN_VIEW_BRANCH"
        />
        <CustomRoute
          path="/admin/list-business/:businessSlug/social-url-links"
          name="Social Url Links"
          component={SocialUrlLinks}
          permission="CAN_VIEW_SOCIAL_URL_LINKS"
        />
        <CustomRoute
          path="/admin/approve-app-business"
          name="List App Business"
          component={AppBusinessList}
          permission="CAN_VIEW_BUSINESS_APP"
        />
        <CustomRoute
          path="/admin/list-business"
          name="List Business"
          component={BusinessList}
          permission="CAN_VIEW_BUSINESS"
        />
        <CustomRoute
          path="/admin/industry"
          name="Industry"
          component={Industry}
          permission="CAN_VIEW_INDUSTRY"
        />
        <CustomRoute
          path="/admin/categories"
          name="Categories"
          component={Categories}
          permission="CAN_VIEW_CATEGORY"
        />
        <CustomRoute
          path="/admin/sub-categories"
          name="Sub Categories"
          component={SubCategories}
          permission="CAN_VIEW_SUB_CATEGORY"
        />
        <CustomRoute
          path="/admin/company-type"
          name="CompanyType"
          component={CompanyType}
          permission="CAN_VIEW_COMPANY_TYPE"
        />
        <CustomRoute
          path="/admin/payment-method"
          name="PaymentMethod"
          component={PaymentMethod}
          permission="CAN_VIEW_PAYMENT_METHOD"
        />
        {/* <CustomRoute
          path="/admin/sections"
          name="Sections"
          component={Sections}
          permission="CAN_VIEW_DASHBOARD"
        /> */}
        <CustomRoute
          exact
          path="/admin/tele-calling"
          name="Tele-Calling"
          component={TeleCalling}
          permission="CAN_VIEW_TELE_CALLING"
        />
        <CustomRoute
          exact
          path="/admin/ecommerce/categories"
          name="Ecommerce-categories"
          component={ManageCategories}
          permission="CAN_VIEW_ECOMMERCE_CATEGORIES"
        />
        <CustomRoute
          exact
          path="/admin/exsection/section-manage"
          name="Manage-sections"
          component={ManageSections}
          permission="CAN_VIEW_ECOMMERCE_CATEGORIES"
        />
        <CustomRoute
          exact
          path="/admin/users"
          name="Users"
          component={ManageUsers}
          permission="CAN_VIEW_USER"
        />
        <CustomRoute
          path="/admin/users/manage-users"
          name="Manage Users"
          component={ManageUsers}
          permission="CAN_VIEW_USER"
        />
        <CustomRoute
          path="/admin/users/add-user"
          name="Add User"
          component={AddUser}
          permission="CAN_ADD_USER"
        />
        <CustomRoute
          path="/admin/users/groups"
          name="Groups"
          component={Groups}
          permission="CAN_VIEW_GROUP"
        />
        <CustomRoute
          path="/admin/users/permissions"
          name="Permissions"
          component={Permissions}
          permission="CAN_ACCESS_PERMISSION"
        />
        <CustomRoute
          path="/admin/users/reset-password"
          name="Reset Password"
          component={ResetPassword}
          permission="CAN_ACCESS_RESET_PASSWORD"
        />
        <CustomRoute
          path="/admin/settings"
          name="Settings"
          component={Settings}
          permission="CAN_ACCESS_SETTINGS"
        />
        <CustomRoute
          path="/admin/subscription-package"
          name="Subscription Package"
          component={SubscriptionPackage}
          permission="CAN_ACCESS_SETTINGS"
        />
        <CustomRoute
          path="/admin/manage-social-links"
          name="Social Links"
          component={SocialLinks}
          permission="CAN_VIEW_SOCIAL_LINKS"
        />
        <CustomRoute
          path="/admin/improve-listing"
          name="Improve Listing"
          component={ImproveListings}
          permission="CAN_VIEW_IMPROVE_LISTING"
        />

        <Route
          path="/admin/campaign-search-placeholder"
          name="Campaign"
          component={CampaignSearchPlaceholder}
          permission="CAN_VIEW_CAMPAIGN"
        />
        <Redirect from="/admin" to="/admin/dashboard" />
        {/* <CustomRoute
          path={`${MATCH_URL}/component2`}
          name="Component 2"
          component={Component2}
        />
        <CustomRoute
          path={`${MATCH_URL}/dashboard`}
          name="Admin Dashboard"
          component={Dashboard}
        />
        <Redirect from={MATCH_URL} to={`${MATCH_URL}/dashboard`} /> */}
      </Switch>
    );
  }
}

export default AdminRoute;
