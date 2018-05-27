import React, { Component } from "react";
import { connect } from "react-redux";
import "../minisite.css";
import { combineEpics } from "redux-observable";

import { BusinessFooter } from "../components";
import withRepics from "../../../../config/withRepics";
import reducers from "../reducers";
//import GridLayout from "react-grid-layout";

import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { Card, CardHeader, CardBody } from "reactstrap";

import minisiteEpics, { onBusinessGet, clearBusiness } from "../actions";
class ThemeLight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: []
    };
  }
  onItemDragged = layout => {
    this.setState({
      layout: layout
    });
    console.log(this.state.layout);
  };

  render() {
    return (
      <div>
        <div>
          <ResponsiveGridLayout
            className="layout"
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={100}
            width={1200}
            onLayoutChange={this.onItemDragged}
          >
            <div
              key="home"
              data-grid={{
                x: 0,
                y: 0,
                w: 1,
                h: 1,
                isResizable: false
              }}
              style={{ backgroundColor: "grey", color: "white" }}
            >
              a
            </div>
            <div
              key="contact"
              data-grid={{
                x: 1,
                y: 0,
                w: 2,
                h: 1,
                minW: 2,
                maxW: 4,
                isResizable: false
              }}
            >
              <Card>
                <CardHeader>
                  <strong>Test Drag</strong>
                </CardHeader>
                <CardBody>Nice</CardBody>
              </Card>
            </div>
            <div
              key="gallery"
              data-grid={{ x: 4, y: 0, w: 1, h: 1, isResizable: false }}
              style={{ backgroundColor: "grey", color: "white" }}
            >
              c
            </div>
          </ResponsiveGridLayout>
        </div>
        <BusinessFooter theme="light" />
      </div>
    );
  }
}

export default withRepics(
  "MinisiteContainer",
  reducers,
  combineEpics(...minisiteEpics)
)(
  connect(
    ({ MinisiteContainer: { edit } }) => ({
      mainLoading: edit.mainLoading
    }),
    { onBusinessGet, clearBusiness }
  )(ThemeLight)
);
