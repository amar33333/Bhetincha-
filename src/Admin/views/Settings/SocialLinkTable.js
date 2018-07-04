import React, { Component } from "react";
import { Button } from "reactstrap";
import ReactTable from "react-table";
import { PopoverDelete, PaginationComponent } from "../../../Common/components";
import filterCaseInsensitive from "../../../Common/utils/filterCaseInsesitive";

import CustomModal from "../../../Common/components/CustomModal";

class SocialLinkTable extends Component {
  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        sortable: false,
        width: 70
      },
      { Header: "Name", accessor: "name" },
      {
        Header: "Logo",
        accessor: "className",
        Cell: ({ value }) => <span className={value} />,
        filterable: false,
        sortable: false
      },
      {
        Header: "Actions",
        id: "edit",
        accessor: "id",
        filterable: false,
        sortable: false,
        width: 145,
        Cell: ({ value, original: { id, name } }) => (
          <div>
            <Button
              color="secondary"
              className="mr-l"
              onClick={() => console.log("edit clicked", value)}
            >
              Edit
            </Button>
            <PopoverDelete
              id={`delete-${value}`}
              onClick={() => this.props.onDelete({ id: value })}
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
          // loading={this.props.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
        />
      </div>
    );
  }
}

export default SocialLinkTable;
