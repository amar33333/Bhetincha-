import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactTable from "react-table";
import Select from "react-select";

import {
  onBusinessAllGet,
  onIndustryList,
  handleOnBusinessFilterChange,
  saveParamsOnUnmount,
  clearFilter
} from "../../actions";

class BusinessList extends Component {
  static getDerivedStateFromProps = (nextProps, prevState) => ({
    params: {
      ...prevState.params,
      rows: nextProps.rows,
      page: nextProps.page
    }
  });

  state = { params: { rows: 1, page: 1 } };

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
              this.props.history.push(`/admin/list-business/${value}/edit`)
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
    this.onBusinessAllGet(this.props.businessParams);
  };

  componentWillUnmount = () => {
    this.props.saveParamsOnUnmount(this.state.params);
  };

  handleChange = (key, event) =>
    this.props.handleOnBusinessFilterChange({ [key]: event.target.value });

  handleIndustryChange = industryFilter =>
    this.props.handleOnBusinessFilterChange({ industryFilter });

  handleSearchKeywordCleared = () => {
    this.props.handleOnBusinessFilterChange({ nameSearch: "" });
    this.state.params.q && this.onBusinessAllGet({ q: "" });
  };

  handleSearchKeywordSubmit = event => {
    event.preventDefault();
    this.onBusinessAllGet({ q: this.props.nameSearch });
  };

  onBusinessAllGet = extraParams => {
    const params = { ...this.state.params, ...extraParams };
    this.setState({ params }, () => this.props.onBusinessAllGet(params));
  };

  onFilter = () => {
    const { industryFilter } = this.props;

    const industry = industryFilter
      ? industryFilter.map(industry => industry.id)
      : [];

    this.onBusinessAllGet({ industry });
  };

  onFilterCleared = () => {
    this.props.clearFilter();
    this.onBusinessAllGet({ industry: [] });
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
            value={this.props.industryFilter}
            valueKey="id"
          />

          <button onClick={this.onFilter}>Filter</button>
          <button onClick={this.onFilterCleared}>Clear Filter</button>
        </div>
        <div>
          <h4>Search Stuff</h4>
          <form onSubmit={this.handleSearchKeywordSubmit}>
            <label>Search Name:</label>
            <input
              onChange={this.handleChange.bind(null, "nameSearch")}
              value={this.props.nameSearch}
            />
            <button>Search</button>
          </form>
          <button onClick={this.handleSearchKeywordCleared}>
            Clear Search
          </button>
        </div>
        <ReactTable
          data={this.props.businesses}
          defaultPageSize={this.props.rows}
          expanded={this.state.expanded}
          loading={this.props.fetchLoading}
          onExpandedChange={(newExpanded, index, event) =>
            this.handleRowExpanded(newExpanded, index, event)
          }
          onPageChange={pageIndex => {
            this.onBusinessAllGet({ page: ++pageIndex });
          }}
          onPageSizeChange={(pageSize, pageIndex) =>
            this.onBusinessAllGet({ page: ++pageIndex, rows: pageSize })
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
      business_reducer: {
        businesses,
        page,
        rows,
        pages,
        fetchLoading,
        businessParams
      },
      filterBusiness,
      industries
    }
  }) => ({
    industries: industries.industries,
    industryLoading: industries.loading,
    businesses,
    businessParams,
    page,
    rows,
    pages,
    fetchLoading,
    ...filterBusiness
  }),
  {
    onBusinessAllGet,
    onIndustryList,
    saveParamsOnUnmount,
    handleOnBusinessFilterChange,
    clearFilter
  }
)(BusinessList);
