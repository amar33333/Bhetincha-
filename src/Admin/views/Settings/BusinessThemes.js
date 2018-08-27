import React, { Component } from "react";
import { connect } from "react-redux";

import ThemeColorCard from "../../../Common/components/ThemeColorCard";

import { Col, Row } from "reactstrap";

import BusinessThemeComponent from "./components/BusinessThemeComponent";

import {
  onBusinessThemesList,
  onBusinessThemeSubmit,
  onBusinessThemeEdit,
  onBusinessThemeRemove
} from "../../actions";

class BusinessThemes extends Component {
  state = {
    title: "",
    brandPrimaryColor: { color: "#2e7a29", alpha: 100 },
    brandDarkColor: { color: "#12520e", alpha: 100 },
    brandLightColor: { color: "#25c11c", alpha: 100 },
    brandInfoColor: { color: "#fff", alpha: 100 },
    brandSuccessColor: { color: "#fff", alpha: 100 },
    brandDangerColor: { color: "#fff", alpha: 100 },
    brandWarningColor: { color: "#fff", alpha: 100 }
  };

  componentDidMount() {
    this.props.onBusinessThemesList();
  }

  render() {
    const testTheme = {
      title: "Green Theme",
      brandPrimaryColor: { color: "#2e7a29", alpha: 100 },
      brandDarkColor: { color: "#12520e", alpha: 100 },
      brandLightColor: { color: "#25c11c", alpha: 100 },
      brandInfoColor: { color: "#fff111", alpha: 100 },
      brandSuccessColor: { color: "#fef89e", alpha: 100 },
      brandDangerColor: { color: "#fff78e", alpha: 100 },
      brandWarningColor: { color: "#d3d3d3", alpha: 100 }
    };
    console.log(this.props);
    return (
      <div className="animated fadeIn">
        <BusinessThemeComponent
          onBusinessThemeSubmit={this.props.onBusinessThemeSubmit}
        />
        <Row>
          <Col>
            {this.props.businessThemes.length
              ? this.props.businessThemes.map(theme => {
                  return (
                    <ThemeColorCard
                      key={theme.id}
                      theme={theme}
                      history={this.props.history}
                      match={this.props.match}
                      onBusinessThemeRemove={this.props.onBusinessThemeRemove}
                    />
                  );
                })
              : null}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({
  AdminContainer: {
    settings: {
      businessThemes,
      businessThemeSubmitLoading,
      businessThemesFetchLoading
    }
  }
}) => ({
  businessThemes,
  businessThemeSubmitLoading,
  businessThemesFetchLoading
});

export default connect(
  mapStateToProps,
  {
    onBusinessThemesList,
    onBusinessThemeSubmit,
    onBusinessThemeEdit,
    onBusinessThemeRemove
  }
)(BusinessThemes);
