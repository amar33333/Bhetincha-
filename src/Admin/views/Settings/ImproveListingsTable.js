import React, { Component } from "react";
import { connect } from "react-redux";
import debounce from "lodash.debounce";
import {
  Button,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Form,
  FormGroup,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import ReactTable from "react-table";
import {
  PopoverDelete,
  Select,
  PaginationComponent
} from "../../../Common/components";

import {
  onImproveListingList,
  handleSortChangeImproveListing,
  handleOnImproveListingFilterChange
} from "../../actions";
import { onProblemTypesList } from "../../../Website/actions";

class ImproveListingsTables extends Component {
  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        sortable: false,
        width: 70
      },
      { Header: "Name", accessor: "name", sortable: false },
      { Header: "Email", accessor: "email", sortable: false },
      {
        Header: "Business Name",
        accessor: "business.name",
        id: "business",
        sortable: false
      },
      {
        Header: "Problem Type",
        accessor: "problem_type.name",
        sortable: false,
        Filter: () => (
          <Select
            clearable
            tabSelectsValue={false}
            multi
            value={this.props.filterProblem}
            onChange={filterProblem =>
              this.props.handleOnImproveListingFilterChange({ filterProblem })
            }
            valueKey="id"
            labelKey="name"
            options={this.props.problem_types}
          />
        )
      },
      {
        Header: "Created Date",
        accessor: "creation.created_date",
        id: "created_date",
        filterable: false
      },
      {
        Header: "Actions",
        id: "edit",
        accessor: "id",
        filterable: false,
        sortable: false,
        width: 145,
        Cell: ({ value, original: { id } }) => (
          <div>
            {/* <PermissionProvider permission="CAN_ADD_STATE">
              <Button
                data-tooltip="Edit"
                data-position="bottom center"
                color="secondary"
                className="mr-2"
                onClick={() =>
                  this.props.toggleStateEditModal({ id, country, name })
                }
              >
                <i className="fa fa-pencil" />
              </Button>
            </PermissionProvider> */}
            {/* <PermissionProvider permission="CAN_ADD_STATE"> */}
            <PopoverDelete
              text={false}
              id={`delete-${value}`}
              onClick={() => console.log(id)}
            />
            {/* </PermissionProvider> */}
          </div>
        )
      }
    ],
    onFilteredChange: (column, value) => {
      value.id === "business" && this.debouncedBusinessSearch(column);
      value.id === "email" && this.debouncedEmailSearch(column);
      value.id === "name" && this.debouncedSearch(column);
    },
    manual: true,
    sortable: true,
    filterable: true,
    minRows: 5,
    className: "-striped -highlight",
    PaginationComponent
  };

  componentDidMount() {
    this.props.onImproveListingList();
    this.props.onProblemTypesList();
  }

  debouncedSearch = debounce(
    column =>
      this.props.handleOnImproveListingFilterChange({
        name: column.filter(x => x.id === "name").length
          ? column.find(x => x.id === "name").value
          : ""
      }),
    200
  );

  debouncedBusinessSearch = debounce(
    column =>
      this.props.handleOnImproveListingFilterChange({
        business: column.filter(x => x.id === "business").length
          ? column.find(x => x.id === "business").value
          : ""
      }),
    200
  );

  debouncedEmailSearch = debounce(
    column =>
      this.props.handleOnImproveListingFilterChange({
        email: column.filter(x => x.id === "email").length
          ? column.find(x => x.id === "email").value
          : ""
      }),
    200
  );

  render() {
    return (
      <div>
        <ReactTable
          {...this.tableProps}
          style={{ background: "white" }}
          data={this.props.improveListings}
          pageSize={this.props.rows}
          sorted={this.props.sort_by}
          loading={this.props.fetchLoading}
          onPageChange={pageIndex =>
            this.props.onImproveListingList({ page: pageIndex + 1 })
          }
          onPageSizeChange={(pageSize, pageIndex) =>
            this.props.onImproveListingList({
              page: pageIndex + 1,
              rows: pageSize
            })
          }
          onSortedChange={this.props.handleSortChangeImproveListing}
          page={this.props.page - 1}
          pages={this.props.pages}
          rowCount={this.props.rowCount}
        />
      </div>
    );
  }
}

export default connect(
  ({
    home: { problem_types },
    AdminContainer: {
      settings: {
        improveListings,
        improveListingsFetchLoading,
        improveListingsPages,
        improveListingsRowCount
      },
      filterImproveListing
    }
  }) => ({
    improveListings,
    pages: improveListingsPages,
    rowCount: improveListingsRowCount,
    fetchLoading: improveListingsFetchLoading,
    problem_types,
    ...filterImproveListing
  }),
  {
    onImproveListingList,
    onProblemTypesList,
    handleOnImproveListingFilterChange,
    handleSortChangeImproveListing
  }
)(ImproveListingsTables);
