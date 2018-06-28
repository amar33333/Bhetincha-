import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

import ReactTable from "react-table";
import {
  PopoverDelete,
  Select,
  PaginationComponent
} from "../../../../Common/components";
import PermissionProvider from "../../../../Common/utils/PermissionProvider";

import CustomModal from "../../../../Common/components/CustomModal";
import UserEditModal from "../../../../Common/components/CustomModal/ModalTemplates/UserEditModal";

import {
  onUsersList,
  onGroupsList,
  handleSortChangeUsers,
  handleOnUsersFilterChange,
  toggleUserEditModal,
  onUserEdit
} from "../../../actions";

class ManageUsers extends Component {
  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        sortable: false,
        width: 70
      },
      { Header: "Username", accessor: "username" },
      { Header: "First Name", accessor: "first_name" },
      { Header: "Last Name", accessor: "last_name" },
      {
        Header: "Group",
        accessor: "group",
        sortable: false,
        Filter: () => (
          <Select
            clearable
            tabSelectsValue={false}
            multi
            value={this.props.filterGroup}
            onChange={filterGroup =>
              this.props.handleOnUsersFilterChange({ filterGroup })
            }
            valueKey="id"
            labelKey="name"
            options={this.props.groups}
          />
        )
      },
      {
        Header: "Actions",
        id: "edit",
        accessor: "id",
        filterable: false,
        sortable: false,
        width: 145,
        Cell: ({ value, original }) => (
          <div>
            <Button
              color="secondary"
              className="mr-l"
              onClick={() => this.props.toggleUserEditModal({ ...original })}
            >
              Edit
            </Button>
            <PopoverDelete
              id={`delete-${value}`}
              onClick={() => console.log("delete", value)}
            />
          </div>
        )
      }
    ],
    onFilteredChange: (column, value) => {
      value.id === "username" && this.debouncedSearch(column, "username");
      value.id === "first_name" && this.debouncedSearch(column, "first_name");
      value.id === "last_name" && this.debouncedSearch(column, "last_name");
    },
    manual: true,
    sortable: true,
    minRows: 5,
    className: "-striped -highlight",
    filterable: true,
    PaginationComponent
  };

  componentDidMount() {
    this.props.onUsersList();
    this.props.onGroupsList();
  }

  debouncedSearch = debounce(
    (column, key) =>
      this.props.handleOnUsersFilterChange({
        [key]: column.filter(x => x.id === key).length
          ? column.find(x => x.id === key).value
          : ""
      }),
    200
  );

  render() {
    return (
      <div className="animated fadeIn">
        <PermissionProvider permission="CAN_ADD_USER">
          <Link to="/admin/users/add-user">
            <Button variant="raised" color="primary" className="mb-4">
              <i className="fa fa-plus" /> Add New User
            </Button>
          </Link>
        </PermissionProvider>
        <ReactTable
          {...this.tableProps}
          style={{ background: "white" }}
          data={this.props.users}
          pageSize={this.props.rows}
          sorted={this.props.sort_by}
          loading={this.props.fetchLoading}
          onPageChange={pageIndex =>
            this.props.onUsersList({ page: pageIndex + 1 })
          }
          onPageSizeChange={(pageSize, pageIndex) =>
            this.props.onUsersList({ page: pageIndex + 1, rows: pageSize })
          }
          onSortedChange={this.props.handleSortChangeUsers}
          page={this.props.page - 1}
          pages={this.props.pages}
          rowCount={this.props.rowCount}
        />
        <CustomModal
          title="Edit User Data"
          isOpen={this.props.userEditModal}
          toggle={this.props.toggleUserEditModal}
          className={"modal-xs" + this.props.className}
        >
          <UserEditModal
            data={{ ...this.props.userEditData, groups: this.props.groups }}
            onUserEdit={this.props.onUserEdit}
          />
        </CustomModal>
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      user_reducer: {
        groups,
        users,
        usersFetchLoading: fetchLoading,
        usersPages: pages,
        usersRowCount: rowCount,
        userEditData,
        userEditModal
      },
      filterUsers
    }
  }) => ({
    groups,
    users,
    fetchLoading,
    pages,
    rowCount,
    ...filterUsers,
    userEditData,
    userEditModal
  }),
  {
    onUsersList,
    onUserEdit,
    onGroupsList,
    handleOnUsersFilterChange,
    handleSortChangeUsers,
    toggleUserEditModal
  }
)(ManageUsers);
