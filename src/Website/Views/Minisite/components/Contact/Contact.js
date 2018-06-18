import React, { Component } from "react";
import { connect } from "react-redux";
import "../../minisite.css";
import MapComponent from "../../../../../Common/components/MapComponent";
import { Col, Row, Container } from "reactstrap";
import { Card, Button } from "semantic-ui-react";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: { lat: 27.7172453, lng: 85.32391758465576 }
    };
  }

  componentDidMount = () => {
    const lat = parseFloat(this.props.address.latitude);
    const lng = parseFloat(this.props.address.longitude);
    setTimeout(() => {
      var latLng = new window.google.maps.LatLng(lat, lng);
      this.mapEl.googleMapEl.panTo(latLng);
    }, 500);

    this.setState({
      position: {
        lat,
        lng
      }
    });
  };

  renderPrimaryAddress = () => {
    return (
      this.props.address && (
        <Col sm="3">
          <Card>
            <Card.Content header="Head Office" />
            <Card.Content>
              {(this.props.address.addressLine1 ||
                this.props.address.addressLine2) && (
                <p>
                  {this.props.address.addressLine1}
                  {this.props.address.addressLine1 && `, `}
                  {this.props.address.addressLine2}
                </p>
              )}
              <p>{`${this.props.address.area.name}, ${
                this.props.address.city.name
              }, ${this.props.address.district.name}`}</p>
              <p>
                {this.props.address.landmark &&
                  `(${this.props.address.landmark})`}
              </p>
              {this.props.address.landlineNumber && (
                <p>
                  <i className="fa fa-phone" />{" "}
                  {this.props.address.landlineNumber}
                </p>
              )}
              {this.props.address.email && (
                <p>
                  <i className="fa fa-envelope" /> {this.props.address.email}
                </p>
              )}
              {this.props.address.contactPerson.map(person => (
                <div>
                  <p className="mt-3">
                    <i className="fa fa-user" /> <strong>{person.name}</strong>
                    <small>
                      {person.department && ` (${person.department})`}
                    </small>
                  </p>
                  {person.mobileNumber ? (
                    <p>
                      <i className="fa fa-mobile"> {person.mobileNumber}</i>
                    </p>
                  ) : null}
                </div>
              ))}
              <a
                href={
                  this.props.address.contactPerson &&
                  this.props.address.contactPerson[0] &&
                  `tel:${this.props.address.contactPerson[0].mobileNumber}`
                }
              >
                <Button primary className="mt-2">
                  Contact Now
                </Button>
              </a>
            </Card.Content>
            {/* <Card.Content extra>
                  <Icon name="user" />
                  4 Friends
                </Card.Content> */}
          </Card>
        </Col>
      )
    );
  };

  renderBranchAddress = () => {
    console.log("branch address:", this.props.branchAddress);
    return (
      this.props.branchAddress &&
      this.props.branchAddress.map(branch => (
        <Col sm="3">
          <Card>
            <Card.Content header={`${branch.area.name} Branch`} />
            <Card.Content>
              {(branch.addressLine1 || branch.addressLine2) && (
                <p>
                  {branch.addressLine1}
                  {branch.addressLine1 && `,`} {branch.addressLine2}{" "}
                </p>
              )}
              <p>{`${branch.area.name}, ${branch.city.name}, ${
                branch.district.name
              }`}</p>
              <p>{branch.landmark && `(${branch.landmark})`}</p>
              {branch.landlineNumber && (
                <p>
                  <i className="fa fa-phone" /> {branch.landlineNumber}{" "}
                </p>
              )}
              {branch.email && (
                <p>
                  <i className="fa fa-envelope" /> {branch.email}{" "}
                </p>
              )}
              {branch.contactPerson &&
                branch.contactPerson.map(person => (
                  <div>
                    <p className="mt-3">
                      <i className="fa fa-user" />{" "}
                      <strong>{person.name}</strong>
                      <small>
                        {person.department && ` (${person.department})`}
                      </small>
                    </p>
                    {person.mobileNumber ? (
                      <p>
                        <i className="fa fa-mobile"> {person.mobileNumber}</i>
                      </p>
                    ) : null}
                  </div>
                ))}
              <a
                href={`tel:${branch.contactPerson &&
                  branch.contactPerson[0].mobileNumber}`}
              >
                <Button primary className="mt-2">
                  Contact Now
                </Button>
              </a>
            </Card.Content>
            {/* <Card.Content extra>
                  <Icon name="user" />
                  4 Friends
                </Card.Content> */}
          </Card>
        </Col>
      ))
    );
  };

  render() {
    console.log("Contact props:", this.props);
    return (
      <div>
        <div>
          <MapComponent
            ref={ref => (this.mapEl = ref)}
            position={this.state.position}
            // onClick={this.onChangeLatLng}
            // onDragEnd={this.onChangeLatLng}
          />
        </div>
        <Container>
          <Row className="mt-5 mb-4">
            <Col sm="12">
              <h2 className="text-center">
                we're always listening. Contact us Now!
              </h2>
            </Col>
          </Row>
          <Row
            className="mt-5 mb-5"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            {this.renderPrimaryAddress()}
            {this.renderBranchAddress()}
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  ({
    MinisiteContainer: {
      crud: {
        business_name,
        business_email,
        business_phone,
        address,
        branchAddress
      }
    }
  }) => ({
    business_name,
    business_email,
    business_phone,
    address,
    branchAddress
  })
)(Contact);
