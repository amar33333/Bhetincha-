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
  CardHeader,
  Container
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
      selectedIds: [],
      section_id: ""
    };
  }
  componentDidMount() {
    const { sectionId } = this.props.match.params;
    console.log(sectionId);
    this.props.eachSectionGet({ sectionId });
    this.state.section_id = this.props.match.params;
  }
  componentDidUpdate(prevpreops) {
    if (prevpreops.match.params !== this.props.match.params) {
      this.forceUpdate();
      this.props.eachSectionGet(this.props.match.params);
      this.state.section_id = this.props.match.params;
    }
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
  renderSubMenu(options) {
    // var display = [];
    //  Object.entries(options.attributes).forEach(element => {
    //     if (element[0] != "uid") {
    //       display.push(element[1]);
    //     }
    //   });
    console.log("lets see value of dusplay", Object.keys(options.attributes));
    Object.keys(options.attributes).map(key => {
      if (key !== "uid") {
        console.log("wht is value of key= " + options.attributes[key]);
        return (
          <td className="whiteSpaceNoWrap">
            {key}: {options.attributes[key]}
          </td>
        );
      }
    });
    // console.log(display);
    // let subMenu;
    // if (options.children && options.children.length > 0) {
    //   var newDepthLevel = depthLevel + 1;
    //   console.log(options.children);

    //   options.children.map(suboptions => {
    //     console.log(options);
    //     console.log(suboptions);
    //     subMenu = this.renderSubMenu(suboptions, newDepthLevel);
    //   });

    // console.log(subMenu);
    // return (
    //   // <li>
    //   //   <strong>   {display}</strong>
    //   //   {subMenu}
    //   // </li>
    // );
  }
  //   console.log(display);
  //   return (
  //     <Col sm="auto" xs="auto">
  //       <ul>
  //         {display.map(data => { return <li>{data}</li>; })}
  //         {/* {display} */}
  //       </ul>
  //     </Col>
  //   );
  // }

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
        <Row className="info">
          {this.props.Section.sections.map(options => {
            console.log("beforre calling subsection  " + options);
            var data = this.renderSubMenu(options);
            console.log(data);
            return (
              <Col xs="3">
                <Card>{data}</Card>
              </Col>
            );
          })}
        </Row>
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
// console.log("lets see value of dusplay", Object.keys(options.attributes));
// var display = Object.keys(options.attributes).map((key) => {
//   if (key !== "uid") {
//     console.log("wht is value of key= " + options.attributes[key])
//     return <td className="whiteSpaceNoWrap">{key}: {options.attributes[key]}</td>
//   }
// })
