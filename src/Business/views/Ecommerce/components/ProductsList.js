import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import ReactTable from "react-table";
import { Button } from "reactstrap";

import {
  PaginationComponent,
  PopoverDelete
} from "../../../../Common/components";
import { MAIN_URL } from "../../../../Common/utils/API";

class ProductsList extends Component {
  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        width: 50
      },
      {
        Header: "Photo",
        accessor: "profilePicture",
        Cell: ({ value }) =>
          value && (
            <img
              alt="profile"
              src={`${MAIN_URL}${value}`}
              style={{ width: 25, height: 25 }}
            />
          ),
        width: 60
      },
      { Header: "Name", accessor: "name" },
      { Header: "Price", accessor: "price" },
      {
        Header: "Actions",
        id: "edit",
        accessor: "uid",
        filterable: false,
        sortable: false,
        width: 145,
        Cell: ({ value }) => (
          <div>
            <Button
              data-tooltip="Detail"
              data-position="bottom center"
              color="secondary"
              className="mr-2"
              onClick={() =>
                this.props.history.push(`${this.props.URL}/${value}`)
              }
            >
              <i className="fa fa-eye" />
            </Button>
            <Button
              data-tooltip="Edit"
              data-position="bottom center"
              color="primary"
              className="mr-2"
              onClick={() =>
                this.props.history.push(`${this.props.URL}/${value}/edit`)
              }
            >
              <i className="fa fa-pencil" />
            </Button>
            <PopoverDelete
              id={`delete-${value}`}
              onClick={() =>
                this.props.onDelete({ uid: value, fetchProductsAgain: true })
              }
            />
          </div>
        )
      }
    ],
    manual: true,
    minRows: 5,
    className: "-striped -highlight",
    PaginationComponent,
    filterable: false,
    sortable: false
  };

  render() {
    return (
      <div>
        <ReactTable
          {...this.tableProps}
          style={{ background: "white" }}
          pageSize={this.props.count}
          onPageChange={pageIndex =>
            this.props.fetchData({ page: pageIndex + 1 })
          }
          page={this.props.page - 1}
          onPageSizeChange={(pageSize, pageIndex) =>
            this.props.fetchData({ page: pageIndex + 1, count: pageSize })
          }
          data={this.props.products}
          pages={Math.ceil(this.props.rowCount / this.props.count)}
          rowCount={this.props.rowCount}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

export default withRouter(ProductsList);
