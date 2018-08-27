import React, { Component } from "react";
import { connect } from "react-redux";

import { onBusinessThemeList, onBusinessThemeEdit } from "../../actions";
import BusinessThemeComponent from "./components/BusinessThemeComponent";

class BusinessThemeEdit extends Component {
  componentDidMount() {
    this.props.onBusinessThemeList({ id: this.props.match.params.id });
  }

  render() {
    console.log("edit: ", this.props);
    return (
      <div className="animated fadeIn">
        <BusinessThemeComponent
          onBusinessThemeEdit={this.props.onBusinessThemeEdit}
          businessTheme={this.props.businessTheme}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  AdminContainer: {
    settings: {
      businessTheme,
      businessThemeSubmitLoading,
      businessThemeFetchLoading
    }
  }
}) => ({
  businessTheme,
  businessThemeSubmitLoading,
  businessThemeFetchLoading
});

export default connect(
  mapStateToProps,
  {
    onBusinessThemeList,
    onBusinessThemeEdit
  }
)(BusinessThemeEdit);
