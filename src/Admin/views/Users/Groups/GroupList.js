import React, { Component } from "react";
import ReactTable from "react-table";
import { Button } from "reactstrap";
import {
  PopoverDelete,
  PaginationComponent
} from "../../../../Common/components";
import filterCaseInsensitive from "../../../../Common/utils/filterCaseInsesitive";

class GroupList extends Component {
  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        sortable: false,
        width: 70
      },
      { Header: "Group", accessor: "name" },
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
              onClick={() => this.props.toggleGroupEditModal({ id, name })}
            >
              Edit
            </Button>
            <PopoverDelete
              id={`delete-${value}`}
              onClick={() => this.props.onGroupDelete({ id: value })}
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
      <ReactTable
        {...this.tableProps}
        style={{ background: "white" }}
        data={this.props.groups}
        defaultFilterMethod={filterCaseInsensitive}
      />
    );
  }
}

export default GroupList;
