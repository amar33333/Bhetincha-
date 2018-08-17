import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  CardDeck,
  Button,
  CardFooter,
  CardHeader
} from "reactstrap";
import { combineEpics } from "redux-observable";
import withRepics from "../../../../../config/withRepics";
import { eachSectionGet } from "./actions/sectionActions";
import sectionReducer from "./reducer";
import sectionEpics from "./actions";
class Sections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: true,
      selectedIds: []
    };
  }
  componentDidMount() {
    const { sectionId } = this.props.match.params;
    console.log(sectionId);
    this.props.eachSectionGet({ sectionId });
  }
  handleSelectedId = (selected, depthLevel) => {
    return () => {
      const updatedArray = this.state.selectedIds.slice(0);

      updatedArray[depthLevel] = selected;

      this.setState({
        selectedIds: updatedArray
      });
    };
  };
  renderDisplay() {
    const classes = {
      dropdown__display: true, //eslint-disable-line quote-props
      "dropdown__display--with-caret": this.props.hasCaret
    };

    return <div className={classes}>{this.props.displayText}</div>;
  }
  renderSubMenu(options, depthLevel = 0) {
    var display = [];
    var menuOptions = Object.entries(options.attributes).forEach(element => {
      display.push(element[0] + ":- " + element[1]);
    });
    console.log(menuOptions);
    let subMenu;
    if (options.children && options.children.length > 0) {
      var newDepthLevel = depthLevel + 1;
      console.log(options.children);

      options.children.map(suboptions => {
        console.log(options);
        console.log(suboptions);
        subMenu = this.renderSubMenu(suboptions, newDepthLevel);
      });

      console.log(subMenu);
      return (
        <li>
          {display}
          {subMenu}
        </li>
      );
    }
    return (
      <div>
        <ul>
          {display.map(data => {
            return <li>{data}</li>;
          })}
        </ul>
      </div>
    );
  }

  render() {
    // const { sectionData } = this.props.Section.sections;
    // console.log("this is my section=" + this.props.Section.sections);
    // console.log("this is my section=" + { sectionData });
    // var objectKeys = Object.keys(this.props.Section.sections);
    // console.log("objectKeys: ", objectKeys);
    // Object.keys(this.props.Section.sections).map(e => {
    //   console.log(`key= ${e} value = ${this.props.Section.sections[e]}`)
    // });
    return (
      <div
        className="minisite_content__wrapper "
        style={{
          paddingTop: "70px",
          paddingLeft: "50px"
        }}
      >
        <p> hello sections!!!</p>
        {this.props.Section.sections.map(options => {
          console.log("beforre calling subsection  " + options);
          var data = this.renderSubMenu(options);
          console.log(data);
          return data;
        })}
      </div>
    );
  }
}

export default withRepics(
  "SectionContainer",
  sectionReducer,
  combineEpics(...sectionEpics)
)(
  connect(
    ({ SectionContainer: { Section }, auth }) => ({
      Section,
      ...auth
    }),
    {
      eachSectionGet
    }
  )(Sections)
);
