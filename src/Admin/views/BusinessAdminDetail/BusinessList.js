import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactTable from "react-table";
import Select from "react-select";

import {
  onBusinessAllGet,
  onIndustryList,
  onFilterCleared,
  handleOnBusinessFilterChange,
  handleSearchKeywordCleared
} from "../../actions";

class BusinessList extends Component {
  tableProps = {
    columns: [
      {
        Header: "Business Name",
        accessor: "business_name",
        Cell: props => {
          const business = props.original;
          return (
            <div>
              <Link to={`/${business.slug}`}>{props.value}</Link>
              <div>Email: {business.email}</div>
              <div>Mobile: {business.phone_number}</div>
            </div>
          );
        }
      },
      {
        Header: "Verified",
        accessor: "verified",
        Cell: props => <div>{props.value ? "Verified" : "Not Verified"}</div>
      },
      {
        Header: "Edit",
        accessor: "slug",
        Cell: ({ value }) => (
          <button
            onClick={() =>
              this.props.history.push(`${this.props.match.path}/${value}/edit`)
            }
          >
            Edit
          </button>
        ),
        sortable: false,
        filterable: false
      },
      {
        Header: "Delete",
        accessor: "id",
        Cell: ({ value }) => (
          <button onClick={() => console.log(value)}>Delete</button>
        ),
        sortable: false,
        filterable: false
      }
    ],
    pageSizeOptions: [5, 10, 20, 25, 50, 100],
    manual: true,
    sortable: true
  };

  componentDidMount = () => {
    this.props.onIndustryList();
    this.props.onBusinessAllGet();
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
          data={this.props.businesses}
          defaultPageSize={this.props.rows}
          loading={this.props.fetchLoading}
          onPageChange={pageIndex => {
            this.props.onBusinessAllGet({ page: ++pageIndex });
          }}
          onPageSizeChange={(pageSize, pageIndex) =>
            this.props.onBusinessAllGet({ page: ++pageIndex, rows: pageSize })
          }
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
    onIndustryList,
    onFilterCleared,
    handleOnBusinessFilterChange,
    handleSearchKeywordCleared
  }
)(BusinessList);
