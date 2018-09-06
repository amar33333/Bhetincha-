import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MinisiteRoutes from "../../config/routes";
import slugify from "slugify";
import { MAIN_URL } from "../../../../../Common/utils/API";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import SideNav from "./sideNav";
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
import { eachSectionGet } from "./actions/sectionActions";

class Sections extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    console.log(sectionId);
    this.props.eachSectionGet({ sectionId });
    // this.state.section_id = this.props.match.params;
  }
  // componentDidUpdate(prevpreops) {
  //   if (prevpreops.match.params !== this.state.section_id) {
  //     this.forceUpdate();
  //     this.props.eachSectionGet(this.props.match.params);
  //     // this.state.section_id = this.props.match.params;
  //   }
  // }

  renderSubMenu(options, da) {
    console.log("my options=,", options);
    var businessName = this.props.cookies.user_data.slug;
    if (options.children && options.children.length > 0) {
      this.state.hasChild = true;
    } else {
      this.state.hasChild = false;
    }
    const min = 80;
    const idel = 100;
    const max = 130;
    var sectionID;
    var name;
    var data = Object.keys(options.attributes).map((key, index) => {
      sectionID = options.attributes.uid;
      name = slugify(options.attributes.name);
      this.state.subSections.uid;
      if (
        key !== "uid" &&
        key !== "creation" &&
        key !== "updation" &&
        key !== "name"
      ) {
        const image = options.attributes[key];
        if (key === "Image") {
          return (
            <CardBody>
              <CardImg
                key={index}
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
            </CardBody>
          );
        }
        // else if (key === "name") {
        //   return (
        //     <CardText style={{ margin: "0" }} className="text-center" key={index}>
        //       <strong> {options.attributes[key]}</strong>
        //     </CardText>
        //   );
        // }
        // else if (key === "Price") {
        //   return (
        //     <CardText style={{ margin: "0" }} className="text-center" key={index}>
        //       Rs. {options.attributes[key]}
        //     </CardText>
        //   );
        // }
        // console.log("my length=>", options.attributes[key].length, "my text=", options.attributes[key])
        return <CardText key={index}>{options.attributes[key]}</CardText>;
      }
    });

    if (this.state.hasChild) {
      return (
        <Card
          style={{
            textAlign: "center",
            borderColor: "#0b8598"
          }}
        >
          <CardImg
            top
            width="100%"
            // src={`${MAIN_URL}${image}`}
            src="https://i0.wp.com/magazine.foodpanda.hk/wp-content/uploads/sites/9/2016/05/Big-Fernand-1-1.jpg"
            alt="img placeholder"
            style={{
              Maxwidth: "100%",
              height: "auto",
              color: "green"
            }}
            className="img-fluid"
          />
          <Link to={`/${businessName}/${name}/${sectionID}`} action="push">
            <CardText>
              {" "}
              <strong>{options.attributes.name}</strong>
            </CardText>
            {data}
          </Link>
        </Card>
      );
    } else {
      return (
        <Card
          style={{
            // borderColor: "#0b8598",
            textAlign: "center",
            textJustify: "inter-word",
            paddingLeft: "2px",
            border: "1px solid  lightgrey"
            // float: "left"
          }}
          key={da}
        >
          <CardImg
            top
            width="100%"
            // src={`${MAIN_URL}${image}`}
            src="https://i2.wp.com/magazine.foodpanda.hk/wp-content/uploads/sites/9/2016/05/Big-Fernand-2-1.jpg"
            alt="img placeholder"
            style={{
              Maxwidth: "100%",
              height: "auto",
              color: "green"
            }}
            className="img-fluid"
          />
          <Link
            to={`/${businessName}/${name}/${sectionID}`}
            style={{ color: "black" }}
            action="push"
          >
            <CardText>
              {" "}
              <strong>{options.attributes.name}</strong>
            </CardText>
            {data}
          </Link>
        </Card>
      );
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
          paddingLeft: "50px",
          backgroundColor: "#FAFAFC"
        }}
      >
        <Row>
          <Col md="12">
            <Row>
              {this.props.Section.sections.map((options, index) => {
                var data = this.renderSubMenu(options, da);
                da = da + 1;
                console.log("my data object=>", data);
                return (
                  <Col key={index} md="3">
                    <div style={{ textAlign: "justify" }}>{data}</div>
                  </Col>
                );
              })}
            </Row>
          </Col>
          {/* <Col md="3">
            <SideNav subsection={this.props.Section.sections} businessName={this.props.cookies.user_data.slug} sect={this.props.test} secList={this.props.secList} > </SideNav>

          </Col> */}
        </Row>
      </div>
    );
  }
}
export default connect(
  ({
    auth: { cookies },
    SectionContainer: { Section },
    MinisiteContainer: { edit }
  }) => ({
    Section,
    test: Section.subsection,
    cookies,
    secList: edit.sections
  }),
  {
    eachSectionGet
  }
)(Sections);
