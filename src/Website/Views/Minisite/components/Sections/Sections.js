import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MinisiteRoutes from "../../config/routes";
import slugify from "slugify";

import { MAIN_URL } from "../../../../../Common/utils/API";
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
      section_id: "",
      count: 0,
      hasChild: false,
      subSections: [
        {
          uid: "",
          name: ""
        }
      ]
    };
  }
  componentDidMount() {
    const { sectionId } = this.props.match.params;
    // console.log(sectionId);
    this.props.eachSectionGet({ sectionId });
    this.state.section_id = this.props.match.params;
  }
  componentDidUpdate(prevpreops) {
    if (prevpreops.match.params !== this.state.section_id) {
      // this.forceUpdate();
      this.props.eachSectionGet(this.props.match.params);
      this.state.section_id = this.props.match.params;
    }
  }

  renderSubMenu(options, da) {
    var businessName = this.props.cookies.user_data.slug;
    if (options.children && options.children.length > 0) {
      this.state.hasChild = true;
    } else {
      this.state.hasChild = false;
    }
    // var businessName = "amt";
    var sectionID;
    var name;
    // console.log("business Name= ", businessName)
    // console.log("lets see value of dusplay", Object.keys(options.attributes));
    var data = Object.keys(options.attributes).map(key => {
      sectionID = options.attributes.uid;
      name = slugify(options.attributes.name);
      this.state.subSections.uid;
      if (key !== "uid" && key !== "creation" && key !== "updation") {
        // console.log("wht is value of key= " + options.attributes[key]);
        const image =
          "/media/5b6691958ffa8506520f8673/member-photos/Sameeee-c27fe911-e743-449f-9ebe-7e91978639f4.jpeg";
        if (key === "Image") {
          return (
            <CardImg
              key={da}
              top
              width="100%"
              // src={`${MAIN_URL}${image}`}
              src="https://bhetincha.app/static/media/logo_hd.8ae38422.png"
              alt="img placeholder"
              style={{
                Maxwidth: "100%",
                height: "auto",
                color: "green"
              }}
              className="img-fluid"
            />
          );
        }
        if (key == "Price") {
          return (
            <h4 style={{ margin: "0" }} className="text-center" key={da++}>
              Rs. {options.attributes[key]}
            </h4>
          );
        }
        return (
          <h4
            style={{ margin: "0" }}
            className="text-center"
            key={options.attributes.uid}
          >
            {options.attributes[key]}
          </h4>
        );
      }
    });

    // console.log(data);
    // console.log(name);
    // console.log(sectionID);
    // console.log(this.state.hasChild);
    if (this.state.hasChild) {
      return (
        <Card>
          <Link to={`/${businessName}/${name}/${sectionID}`} action="push">
            {data}
          </Link>
        </Card>
      );
    } else {
      return <Card key={da}>{data}</Card>;
    }
  }

  render() {
    console.log("soling sub section from sections class", this.props);
    var da = 0;
    return (
      <div
        className="minisite_content__wrapper "
        style={{
          paddingTop: "70px",
          paddingLeft: "50px"
        }}
      >
        <Row>
          {this.props.Section.sections.map(options => {
            // console.log("beforre calling subsection  " + options.attributes);
            var data = this.renderSubMenu(options, da);
            da = da + 1;
            // console.log(data);
            return (
              <Col key={da} xs="3">
                <div>{data}</div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

// export default withRepics(
//   "SectionContainer",
//   sectionReducer,
//   combineEpics(...sectionEpics)
// )(
export default connect(
  ({ auth: { cookies }, SectionContainer: { Section } }) => ({
    Section,
    cookies
  }),
  {
    eachSectionGet
  }
)(Sections);
// );
