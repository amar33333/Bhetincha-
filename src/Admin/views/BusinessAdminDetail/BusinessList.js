import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactTable from "react-table";
import Select from "react-select";

import { onBusinessAllGet, onIndustryList } from "../../actions";

import BusinessEdit from "./BusinessEdit";

class BusinessList extends Component {
  static getDerivedStateFromProps = (nextProps, prevState) => ({
    params: { ...prevState.params, rows: nextProps.rows, page: nextProps.page }
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
      return <BusinessEdit data={data} />;
    },
    pageSizeOptions: [5, 10, 20, 25, 50, 100],
    manual: true,
    sortable: true
  };

  componentDidMount = () => {
    this.props.onIndustryList();
    this.onBusinessAllGet({});
  };

  handleChange = (key, event) => this.setState({ [key]: event.target.value });

  handleIndustryChange = industryFilter => this.setState({ industryFilter });

  handleRowExpanded = (newExpanded, index) =>
    this.setState({ expanded: { [index]: newExpanded[index] } });

  handleSearchKeywordCleared = () => {
    this.setState({ nameSearch: "" });
    this.state.params.q && this.onBusinessAllGet({ q: "" });
  };

  handleSearchKeywordSubmit = event => {
    event.preventDefault();
    this.onBusinessAllGet({ q: this.state.nameSearch });
  };

  onBusinessAllGet = extraParams => {
    const params = { ...this.state.params, ...extraParams };
    this.setState({ params }, () => this.props.onBusinessAllGet(params));
  };

  onFilter = () => {
    const { industryFilter } = this.state;

    const industry = industryFilter
      ? industryFilter.map(industry => industry.id)
      : [];

    this.onBusinessAllGet({ industry });
  };

  onFilterCleared = () => {
    this.setState(
      {
        industryFilter: null
      },
      this.onFilter
    );
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
            value={this.state.industryFilter}
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
              value={this.state.nameSearch}
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
