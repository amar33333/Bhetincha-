import React, { Component } from "react";
import { Button } from "reactstrap";
import ReactTable from "react-table";
import { PopoverDelete, PaginationComponent } from "../../../Common/components";
import filterCaseInsensitive from "../../../Common/utils/filterCaseInsesitive";

import CustomModal from "../../../Common/components/CustomModal";

import PermissionProvider from "../../../Common/utils/PermissionProvider";

class SocialUrlLinksTable extends Component {
  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        sortable: false,
        width: 70
      },
      {
        Header: "Name",
        accessor: "social_nw.name",
        Cell: ({
          value,
          original: {
            social_nw: { className }
          }
        }) => (
          <span>
            <span className={className} /> {value}
          </span>
        )
      },
      {
        Header: "Link",
        accessor: "link",
        Cell: ({ value }) => (
          <a target="_blank" href={value}>
            {value}
          </a>
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
            <PermissionProvider permission="CAN_EDIT_SOCIAL_LINKS">
              <Button
                data-tooltip="Edit"
                data-position="bottom center"
                color="secondary"
                className="mr-2"
                onClick={() => this.props.onEdit({ original })}
              >
                <i className="fa fa-pencil" />
              </Button>
            </PermissionProvider>

            <PermissionProvider permission="CAN_DELETE_SOCIAL_LINKS">
              <PopoverDelete
                id={`delete-${value}`}
                onClick={() => this.props.onDelete({ id: value })}
              />
            </PermissionProvider>
          </div>
        )
      }
    ],
    minRows: 5,
    defaultPageSize: 20,
    className: "-striped -highlight",
    filterable: true,
    PaginationComponent
  };

  render() {
    return (
      <div>
        <ReactTable
          {...this.tableProps}
          style={{ background: "white" }}
          data={this.props.data}
          loading={this.props.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
        />
      </div>
    );
  }
}

export default SocialUrlLinksTable;
