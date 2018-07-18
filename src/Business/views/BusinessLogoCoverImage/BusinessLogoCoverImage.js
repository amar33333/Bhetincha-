import React, { Component } from "react";
import { connect } from "react-redux";

import { onBusinessLogoCoverImageList } from "../../actions";

class BusinessLogoCoverImage extends Component {
  componentDidMount() {
    this.props.onBusinessLogoCoverImageList({
      business_slug: this.props.match.params.businessName
    });
  }

  render() {
    console.log("logo props: ", this.props);
    return (
      <div className="animated fadeIn">
        {/* Put Your Code Here ...
        * And Delete this comment when/after implementing ...
        */}
      </div>
    );
  }
}
const mapStateToProps = ({
  BusinessContainer: {
    business_reducer: { logo, cover_image, fetchLoading }
  }
}) => {
  return {
    logo,
    cover_image,
    fetchLoading
  };
};

export default connect(
  mapStateToProps,
  { onBusinessLogoCoverImageList }
)(BusinessLogoCoverImage);
