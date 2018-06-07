import React, { Component } from "react";
import { connect } from "react-redux";
import "../../minisite.css";
import MapComponent from "../../../../../Common/components/MapComponent";
import withRepics from "../../../../../config/withRepics";
import businessReducers from "../../../../../Business/reducers";

import { MAIN_URL } from "../../config/MINISITE_API";
import { CustomModal } from "../../../../../Common/components";

import { Button } from "reactstrap";
import { Divider } from "semantic-ui-react";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: { lat: 27.7172453, lng: 85.32391758465576 }
    };
  }
  render() {
    console.log("Contact props:", this.props);
    return (
      <div>
        <MapComponent
          ref={ref => (this.mapEl = ref)}
          position={this.state.position}
          onClick={this.onChangeLatLng}
          onDragEnd={this.onChangeLatLng}
        />
      </div>
    );
  }
}

export default withRepics("BusinessContainer", businessReducers)(
  connect(({ BusinessContainer: { business_reducer } }) => ({
    business_reducer
  }))(Contact)
);
