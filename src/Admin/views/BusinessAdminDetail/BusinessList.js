import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactTable from "react-table";
import Select from "react-select";

import { onBusinessAllGet, onIndustryList } from "../../actions";

import BusinessEdit from "./BusinessEdit";

class BusinessList extends Component {
  static getDerivedStateFromProps = nextProps => ({
    params: { rows: nextProps.rows, page: nextProps.page }
  });

  state = {
    params: { rows: 1, page: 1 },
    expanded: {},
    nameSearch: "",
    industryFilter: null
  };

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
        expander: true,
        Header: "Edit",
        width: 65,
        Expander: ({ isExpanded, ...rest }) => (
          <div>
            {isExpanded ? <span>&#x2299;</span> : <span>&#x2295;</span>}
          </div>
        ),
        style: {
          cursor: "pointer",
          fontSize: 25,
          padding: "0",
          textAlign: "center",
          userSelect: "none"
        }
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
    SubComponent: row => {
      const data = row.original;
      return <BusinessEdit username={data.slug} />;
    },
    pageSizeOptions: [5, 10, 20, 25, 50, 100],
    manual: true,
    sortable: true
  };

  componentDidMount = () => {
    this.props.onIndustryList();
    this.onBusinessAllGet(this.state.params);
  };

  handleChange = (key, event) => this.setState({ [key]: event.target.value });

  handleIndustryChange = industryFilter => this.setState({ industryFilter });

  handleRowExpanded = (newExpanded, index) =>
    this.setState({ expanded: { [index]: newExpanded[index] } });

  handleSearchKeywordSubmit = event => {
    event.preventDefault();
    console.log("name search", this.state.nameSearch);
  };

  onBusinessAllGet = extraParams =>
    this.props.onBusinessAllGet({ ...this.state.params, ...extraParams });

  render() {
    return (
      <div className="animated fadeIn">
        Hello BusinessList
        <div>
          <p>Filter Stuff</p>
          {/* TODO: Industry Filter */}
          <h5>Industry Filter</h5>
          <Select
            autosize
            multi
            options={this.props.industries}
            onChange={this.handleIndustryChange}
            loading={this.props.industryLoading}
            value={this.state.industryFilter}
            labelKey="name"
            valueKey="id"
          />

          <button onClick={() => console.log("filter gaar")}>Filter</button>
        </div>
        <div>
          <h4>Search Stuff</h4>
          <form onSubmit={this.handleSearchKeywordSubmit}>
            <label>Search Name:</label>
            <input
              value={this.state.nameSearch}
              onChange={this.handleChange.bind(null, "nameSearch")}
            />
            <button>Search</button>
          </form>
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
      business_reducer: { businesses, page, rows, pages, fetchLoading },
      industries
    }
  }) => ({
    industries: industries.industries,
    industryLoading: industries.loading,
    businesses,
    page,
    rows,
    pages,
    fetchLoading
  }),
  { onBusinessAllGet, onIndustryList }
)(BusinessList);
