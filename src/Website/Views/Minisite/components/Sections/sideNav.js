import React, { Component } from "react";
import slugify from "slugify";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import { ListGroup, ListGroupItem } from "reactstrap";
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
import { Link } from "react-router-dom";

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navitems: []
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props != prevProps) {
      this.state.navitems = prevProps.subsection;
      console.log(this.state.navitems);
      console.log(prevProps.subsection, "previous items");

      // this.props.subsection = prevProps.subsection;
    }
  }
  render() {
    return (
      <ListGroup>
        {this.props.subsection.map((section, index) => {
          console.log(section, "this is section in sidenav");
          let sectionID = section.attributes.uid;
          let name = slugify(section.attributes.name);
          // let name = "amy";
          if (section.children.length > 0) {
            return (
              <ListGroupItem style={{ backgroundColor: "black" }} key={index}>
                <Link to={`/${this.props.businessName}/${name}/${sectionID}`}>
                  {name}{" "}
                </Link>
              </ListGroupItem>
            );
          }
        })}
        {this.props.secList.map((section, index) => {
          let sectionID = section.uid;
          let name = slugify(section.name);
          // let name = "amy";
          // if (section.children.length > 0) {
          return (
            <ListGroupItem key={index}>
              <Link to={`/${this.props.businessName}/${name}/${sectionID}`}>
                {name}{" "}
              </Link>
            </ListGroupItem>
          );
          // }
        })}
        {/* {this.props.sect.map((section, index) => {
          console.log(section, "this is section in sidenav")
          let sectionID = section.attributes.uid;
          let name = slugify(section.attributes.name);
          // let name = "amy";
          if (section.children.length > 0) {
            return (
              <ListGroupItem style={{ backgroundColor: "black" }} key={index} ><Link to={`/${this.props.businessName}/${name}/${sectionID}`}>{name} </Link></ListGroupItem>
            );
          }
        })} */}
      </ListGroup>
    );
  }
}
export default SideNav;
