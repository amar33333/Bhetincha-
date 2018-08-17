import React, { Component } from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import Joyride from "react-joyride";
import { ACTIONS, EVENTS } from "react-joyride/es/constants";
import {
  Header,
  Sidebar,
  Breadcrumb,
  Aside,
  Footer
} from "../Common/components";
import nav from "./config/nav";

import { combineEpics } from "redux-observable";
import BusinessRoute from "./config/routes";
import withRepics from "../config/withRepics";
import businessReducers from "./reducers";
import businessEpics from "./config/epics";

import { ROUTE_PARAMS_BUSINESS_NAME } from "../config/CONSTANTS";

class Business extends Component {
  state = {
    nav: [],
    routes: [],
    run: false,
    stepIndex: 0,
    steps: [
      {
        target: ".joyride-dashboard",
        disableBeacon: true,
        styles: {
          options: {
            width: 600,
            overlayColor: "rgba(0, 0, 0, 0.8)"
          }
        },
        content:
          "Welcome to Bhetincha Quick Tour. Please Take a moment to go through all the guides before diving into the awesome business experience",
        placement: "center",
        locale: { skip: "wow!" }
      },
      {
        target: ".joyride-avatar",

        styles: {
          options: {
            width: 600,
            overlayColor: "rgba(0, 0, 0, 0.8)"
          }
        },
        content:
          "You can get all of your business Navigation from here. You can quickly jump between your dashboard and minisite from here. Try Clicking on the Logo.",
        placement: "bottom",
        title: "Your Avatar"
      },
      {
        target: ".joyride-dashboard",
        styles: {
          options: {
            width: 600,
            overlayColor: "rgba(0, 0, 0, 0.8)"
          }
        },
        content:
          "This is your Dashboard. You will find relevent information about your business here.",
        placement: "bottom",
        title: "Dashboard"
      },
      {
        target: ".joyride-sidebar",
        styles: {
          options: {
            width: 600,
            overlayColor: "rgba(0, 0, 0, 0.8)"
          }
        },
        content:
          "You can quickly change your business information from this pane. Try changing your business slug and working hour under General Info.",
        placement: "right",
        title: "Side Bar"
      }
    ]
  };

  handleJoyrideCallback = data => {
    const { action, index, type } = data;

    //if (status === STATUS.RUNNING) {
    if (type === EVENTS.TOUR_END && this.state.run) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ run: false, stepIndex: 0 });
    } else if (type === EVENTS.STEP_AFTER && index === 0) {
      this.setState({
        run: true,
        stepIndex: index + (action === ACTIONS.PREV ? -1 : 1)
      });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      // Update state to advance the tour
      this.setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
    } else if (type === EVENTS.TOOLTIP_CLOSE) {
      this.setState({ stepIndex: index + 1 });
    }
    //}
  };

  handleTakeTour = () => {
    this.setState({
      run: true
    });
  };

  componentDidMount() {
    //console.log("this.props", this.props);
    document.body.classList.add(
      "app",
      "header-fixed",
      "sidebar-fixed",
      "aside-menu-fixed",
      "aside-menu-hidden"
    );
    this.updateSidebar();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.cookies.user_data.slug !==
      this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
    ) {
      this.props.history.push("/");
    }

    if (
      this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME] !==
      prevProps.match.params[ROUTE_PARAMS_BUSINESS_NAME]
    ) {
      this.updateSidebar();
    }
  }

  componentWillUnmount() {
    document.body.classList.remove(
      "app",
      "header-fixed",
      "sidebar-fixed",
      "aside-menu-fixed",
      "aside-menu-hidden"
    );
  }

  updateSidebar() {
    const routes = {};
    Object.keys(nav.routes).forEach(
      key =>
        (routes[
          key.replace(
            ROUTE_PARAMS_BUSINESS_NAME,
            this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
          )
        ] =
          nav.routes[key])
    );

    const items = nav.items.map(item => {
      const temp = {};
      if (item.name) {
        temp.name = item.name.replace(
          ROUTE_PARAMS_BUSINESS_NAME,
          this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
        );
      }
      if (item.url) {
        temp.url = item.url.replace(
          ROUTE_PARAMS_BUSINESS_NAME,
          this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
        );
      }
      if (item.children) {
        temp.children = item.children.map(child => {
          const childTemp = {};
          if (child.name) {
            childTemp.name = child.name.replace(
              ROUTE_PARAMS_BUSINESS_NAME,
              this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
            );
          }
          if (child.url) {
            childTemp.url = child.url.replace(
              ROUTE_PARAMS_BUSINESS_NAME,
              this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
            );
          }
          return { ...child, ...childTemp };
        });
      }
      return { ...item, ...temp };
    });

    this.setState({
      nav: items,
      routes
    });
  }

  render() {
    const { steps, run, stepIndex } = this.state;
    return (
      <div className="app">
        <Joyride
          continuous
          scrollToFirstStep
          showProgress
          showSkipButton={true}
          steps={steps}
          stepIndex={stepIndex}
          run={run}
          callback={this.handleJoyrideCallback}
        />
        <Header className="joyride-header" />
        <div className="app-body">
          <Sidebar
            {...this.props}
            nav={this.state.nav}
            className="joyride-sidebar"
          />
          <main className="main">
            <Breadcrumb routes={this.state.routes} />
            <Container fluid>
              <BusinessRoute
                handleTakeTour={this.handleTakeTour}
                params={this.props.match.params}
              />
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRepics(
  "BusinessContainer",
  businessReducers,
  combineEpics(...businessEpics)
)(connect(({ auth: { cookies } }) => ({ cookies }))(Business));
