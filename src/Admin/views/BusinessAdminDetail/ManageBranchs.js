import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "reactstrap";

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

class ManageBranchs extends Component {
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
    console.log("manage branchs props: ", this.props);
    return (
      <div className="animated fadeIn">
        <Link
          to={{
            pathname: `/admin/list-business/${
              this.props.match.params.businessSlug
            }/manage-branchs/add-branch`,
            state: this.props.location.state
          }}
        >
          <Button variant="raised" color="primary">
            Add New Branch
          </Button>
        </Link>
        <p>Show Branch List Table Here</p>
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      business_reducer: { businesses, fetchLoading, pages, rowCount },
      filterBusiness,
      industries
    }
  }) => ({
    industries: industries.industries,
    industryLoading: industries.loading,
    businesses,
    pages,
    rowCount,
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
)(ManageBranchs);
