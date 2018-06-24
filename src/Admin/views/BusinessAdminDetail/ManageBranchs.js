import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "reactstrap";

import { onBusinessEachList } from "../../actions";

class ManageBranchs extends Component {
  access_token = this.props.cookies
    ? this.props.cookies.token_data.access_token
    : null;

  componentDidMount = () => {
    this.props.onBusinessEachList({
      username: this.props.match.params.businessSlug,
      access_token: this.access_token
    });
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
      business_reducer: { businessData }
    },
    auth
  }) => ({
    ...auth,
    businessData
  }),
  {
    onBusinessEachList
  }
)(ManageBranchs);
