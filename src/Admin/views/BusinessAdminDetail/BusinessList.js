import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactTable from "react-table";
import Select from "react-select";
import moment from "moment";
import { Button } from "reactstrap";
import { Tooltip, PopoverDelete } from "../../../Common/components";

import {
  onBusinessAllGet,
  onBusinessEachDelete,
  onIndustryList,
  onFilterCleared,
  handleOnBusinessFilterChange,
  handleSearchKeywordCleared,
  onUnmountIndustry,
  handleSortChangeBusiness
} from "../../actions";

class BusinessList extends Component {
  tableProps = {
    columns: [
      {
        Header: "Business Name",
        id: "name",
        accessor: "business_name",
        minWidth: 200,
        Cell: props => {
          const business = props.original;
          return (
            <div>
              <Link to={`/${business.slug}`}>{props.value}</Link>
              <div>Email: {business.email}</div>
              <div>Mobile: {business.phone_number}</div>
              {business.creation && (
                <Tooltip
                  content={business.creation.created_date.slice(0, 10)}
                  placement="right"
                  id={`Tooltip-created-date-${business.id}`}
                >
                  <span id={`Tooltip-created-date-${business.id}`}>
                    Joined {moment(business.creation.created_date).fromNow()}
                  </span>
                </Tooltip>
              )}
            </div>
          );
        }
      },
      {
        Header: "Profile",
        accessor: "is_active",
        width: 110,
        Cell: ({ value }) => <div>{value ? "Active" : "Not Active"}</div>,
        sortable: false,
        filterable: false
      },
      {
        Header: "Claimed",
        accessor: "claimed",
        width: 110,
        Cell: ({ value }) => <div>{value ? "Claimed" : "Not Claimed"}</div>,
        sortable: false,
        filterable: false
      },
      {
        Header: "Verified",
        accessor: "verified",
        width: 110,
        Cell: ({ value }) => <div>{value ? "Verified" : "Not Verified"}</div>,
        sortable: false,
        filterable: false
      },
      {
        Header: "Actions",
        accessor: "slug",
        width: 130,
        Cell: props => (
          <div>
            <Button
              color="secondary"
              className="mr-l"
              onClick={() =>
                this.props.history.push(
                  `${this.props.match.path}/${props.value}/edit`
                )
              }
            >
              Edit
            </Button>
            <PopoverDelete
              id={`delete-${props.original.id}`}
              onClick={() =>
                this.props.onBusinessEachDelete({ id: props.original.id })
              }
            />
          </div>
        ),
        sortable: false,
        filterable: false
      }
    ],
    pageSizeOptions: [5, 10, 20, 25, 50, 100],
    manual: true,
    sortable: true,
    minRows: 2
  };

  componentDidMount = () => {
    this.props.onIndustryList();
    this.props.onBusinessAllGet();
  };

  componentWillUnmount = () => {
    this.props.onUnmountIndustry();
  };

  handleChange = (key, event) =>
    this.props.handleOnBusinessFilterChange({ [key]: event.target.value });

  handleIndustryChange = industry =>
    this.props.handleOnBusinessFilterChange({ industry });

  handleSearchKeywordSubmit = event => {
    event.preventDefault();
    this.props.onBusinessAllGet();
  };

  render() {
    return (
      <div className="animated fadeIn">
        Hello BusinessList
        <div>
          <p>Filter Stuff</p>
          <span>Industry Filter</span>
          <Select
            // autosize
            disabled={this.props.industryLoading}
            isLoading={this.props.industryLoading}
            labelKey="name"
            multi
            onChange={this.handleIndustryChange}
            options={this.props.industries}
            placeholder="--- All ---"
            value={this.props.industry}
            valueKey="id"
          />

          <button onClick={this.props.onBusinessAllGet}>Filter</button>
          <button onClick={this.props.onFilterCleared}>Clear Filter</button>
        </div>
        <div>
          <h4>Search Stuff</h4>
          <form onSubmit={this.handleSearchKeywordSubmit}>
            <label>Search Name:</label>
            <input
              onChange={this.handleChange.bind(null, "q")}
              value={this.props.q}
            />
            <button>Search</button>
          </form>
          <button onClick={this.props.handleSearchKeywordCleared}>
            Clear Search
          </button>
        </div>
        <ReactTable
          style={{ background: "white" }}
          className="-striped -highlight"
          data={this.props.businesses}
          defaultPageSize={this.props.rows}
          defaultSorted={this.props.sort_by}
          loading={this.props.fetchLoading}
          onPageChange={pageIndex => {
            this.props.onBusinessAllGet({ page: ++pageIndex });
          }}
          onPageSizeChange={(pageSize, pageIndex) =>
            this.props.onBusinessAllGet({ page: ++pageIndex, rows: pageSize })
          }
          onSortedChange={newSorted => {
            this.props.handleSortChangeBusiness(newSorted);
            // this.props.onBusinessAllGet({
            //   sort_by: newSorted.map(
            //     data => `${data.id}-${data.desc ? "desc" : "asc"}`
            //   )
            // });
          }}
          page={this.props.page - 1}
          pages={this.props.pages}
          {...this.tableProps}
        />
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      business_reducer: { businesses, fetchLoading, pages },
      filterBusiness,
      industries
    }
  }) => ({
    industries: industries.industries,
    industryLoading: industries.loading,
    businesses,
    pages,
    fetchLoading,
    ...filterBusiness
  }),
  {
    onBusinessAllGet,
    onBusinessEachDelete,
    onIndustryList,
    onFilterCleared,
    handleOnBusinessFilterChange,
    handleSearchKeywordCleared,
    handleSortChangeBusiness,
    onUnmountIndustry
  }
)(BusinessList);
