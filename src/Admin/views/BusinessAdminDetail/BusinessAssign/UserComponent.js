import React, { Component } from "react";
import classnames from "classnames";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Label,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";

// import Select from "react-select";
// import { lightBaseTheme } from "material-ui/styles";

import { Tab } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

var panes = [];

class UserComponent extends Component {
  constructor(props) {
    super(props);

    this.toggleActivePathTab = this.toggleActivePathTab.bind(this);
    this.state = {
      activeTab: "",
      activeIndex: 0,
      activeBusinessTab: ""
    };

    console.log("tab user props: ", this.props.assignedPaths);
    if (this.props.assignedPaths) {
      console.log(
        "tab user component: ",
        this.state.activeIndex,
        this.props.assignedPaths
      );
      console.log(
        "tab active index: ",
        this.props.assignedPaths.paths[this.state.activeIndex]
      );
      this.props.salesUserActivePath(
        this.props.assignedPaths.paths[this.state.activeIndex]
      );
    } else {
      console.log("tab else user componenet");
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    // console.log("aaa: , prevstate", prevState);
    // console.log("aaa: nextProps: ", nextProps);
    // if (nextProps.assignedPaths) {
    //   console.log(
    //     "user component: ",
    //     prevState.activeIndex,
    //     nextProps.assignedPaths
    //   );
    //   console.log(
    //     "active index: ",
    //     nextProps.assignedPaths[prevState.activeIndex]
    //   );
    //   nextProps.salesUserActivePath(
    //     nextProps.assignedPaths[prevState.activeIndex]
    //   );
    // } else {
    //   console.log("else user componenet");
    // }
  };

  toggleActivePathTab(tabID) {
    if (this.state.activeTab !== tabID) {
      this.setState({
        activeTab: tabID
      });
    }
  }

  toggleActiveBusinessTab(businessTabID) {
    if (this.state.activeBusinessTab !== businessTabID) {
      this.setState({
        activeBusinessTab: businessTabID
      });
    }
  }
  // renderNavTabs = () => {
  //   this.props.assignedPaths &&
  //     this.props.assignedPaths.paths.map(path => {
  //       console.log("Path:", path);
  //       console.log("Path Name:", path.name);
  //       return (
  //         <NavItem>
  //           <NavLink href="#" active>
  //             aaija
  //           </NavLink>
  //         </NavItem>
  //       );
  //     });
  // };

  // renderNavTabs = () => {
  //   panes =
  //     this.props.assignedPaths &&
  //     this.props.assignedPaths.map((path, index) => ({
  //       menuItem: path.name,
  //       render: () => <Tab.Pane>Tab {index} Content</Tab.Pane>
  //     }));
  //   console.log(panes);
  // };

  // componentDidMount = () => {
  //   const panes =
  //     this.props.assignedPaths &&
  //     this.props.assignedPaths.paths.map((path, index) => ({
  //       menuItem: path.name,
  //       render: () => <Tab.Pane>Tab {index} Content</Tab.Pane>
  //     }));
  //   console.log("panes: ", panes);
  // };

  handleTabChange = (e, { activeIndex }) => {
    console.log("tab change: ", activeIndex, this.props.assignedPaths);
    this.setState({ activeIndex }, () => {
      if (this.props.assignedPaths) {
        console.log(
          "user component: ",
          this.state.activeIndex,
          this.props.assignedPaths.paths[activeIndex]
        );
        console.log(
          "tab active index: ",
          this.props.assignedPaths.paths[this.state.activeIndex]
        );
        this.props.salesUserActivePath(
          this.props.assignedPaths.paths[activeIndex]
        );
      } else {
        console.log("else user componenet");
      }
    });
  };

  render() {
    const {
      username,
      first_name,
      last_name,
      email,
      groups,
      phone_number
    } = this.props.salesUser;
    console.log("Panes from render: ", panes);

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Sales User: {username}</strong>
          </CardHeader>
          <CardBody>
            <p>
              Name : {first_name} {last_name}
            </p>
            <p> Email : {email}</p>
            <p> Department : {groups[0].name}</p>
            <p> Contact Number : {phone_number} </p>
            <Tab
              activeIndex={this.state.activeIndex}
              onTabChange={this.handleTabChange}
              panes={
                this.props.assignedPaths &&
                this.props.assignedPaths.paths.map((path, index) => {
                  {
                    /* this.props.salesUserActivePath({ activePath: path }); */
                  }
                  return {
                    menuItem: path.name,
                    render: () => (
                      <Tab.Pane>
                        <Tab
                          menu={{ fluid: true, vertical: true }}
                          menuPosition="left"
                          panes={path.bs.map(bs => ({
                            menuItem: bs.business_name,
                            render: () => (
                              <Tab.Pane>
                                <Label>Notes</Label>
                                <Card>
                                  <CardBody>{bs.notes}</CardBody>
                                </Card>
                                <Label>Remainder</Label>
                                <Card>
                                  <CardBody />
                                </Card>
                              </Tab.Pane>
                            )
                          }))}
                        />
                      </Tab.Pane>
                    )
                  };
                })
              }
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default UserComponent;
