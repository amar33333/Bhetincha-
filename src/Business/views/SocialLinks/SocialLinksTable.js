import React, { Component } from "react";
import { Button } from "reactstrap";
import ReactTable from "react-table";
import { PopoverDelete, PaginationComponent } from "../../../Common/components";
import filterCaseInsensitive from "../../../Common/utils/filterCaseInsesitive";

import CustomModal from "../../../Common/components/CustomModal";

class SocialLinksTable extends Component {
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
            <Button
              data-tooltip="Edit"
              data-position="bottom center"
              color="secondary"
              className="mr-2"
              onClick={() => this.props.onEdit({ original })}
            >
              <i className="fa fa-pencil" />
            </Button>

            <PopoverDelete
              id={`delete-${original.social_nw.id}`}
              onClick={() => {
                this.props.onDelete({
                  social_link_id: original.social_nw.id
                });
              }}
            />
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

export default SocialLinksTable;
