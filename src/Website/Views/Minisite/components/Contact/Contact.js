import React, { Component } from "react";
import { connect } from "react-redux";
import "../../minisite.css";
import MapComponent from "../../../../../Common/components/MapComponent";
import { Col, Row, Container } from "reactstrap";
import { Card, Button } from "semantic-ui-react";

import { directionRenderer } from "../../../../../Common/utils/Extras";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: { lat: 27.7172453, lng: 85.32391758465576 },
      source: null,
      destination: null
    };
  }

  componentDidMount = () => {
    const lat = this.props.address && parseFloat(this.props.address.latitude);
    const lng = this.props.address && parseFloat(this.props.address.longitude);

    this.setState({
      position: {
        lat,
        lng
      }
    });
  };

  drawPath = address => () => {
    console.log("clicked drawa patha: ", address);

    this.setState({
      source: {
        latitude:
          this.props.user_geo_coords && this.props.user_geo_coords.latitude,
        longitude:
          this.props.user_geo_coords && this.props.user_geo_coords.longitude
      },
      destination: {
        latitude: address.latitude,
        longitude: address.longitude
      }
    });
  };

  renderPrimaryAddress = () => {
    return (
      this.props.address && (
        <Col sm="3">
          <Card className="mb-3">
            <Card.Content
              // header={branch.area ? `${branch.area.name} Branch` : "New Branch"}
              onClick={this.drawPath(this.props.address)}
            >
              <Card.Header>
                <div
                  className="address-card-header"
                  data-tooltip={`Get Direction to this Address`}
                  data-position="bottom center"
                >
                  <span>Head Office</span>
                  <i className="fa fa-location-arrow" />
                </div>
              </Card.Header>
            </Card.Content>
            <Card.Content>
              {(this.props.address.addressLine1 ||
                this.props.address.addressLine2) && (
                <p>
                  {this.props.address.addressLine1}
                  {this.props.address.addressLine1 && `, `}
                  {this.props.address.addressLine2}
                </p>
              )}
              <p>
                {this.props.address &&
                  this.props.address.area &&
                  `${this.props.address.area.name},`}
                {this.props.address &&
                  this.props.address.city &&
                  `${this.props.address.city.name},`}

                {this.props.address &&
                  this.props.address.district &&
                  `${this.props.address.district.name}`}
              </p>
              <p>
                {this.props.address.landmark &&
                  `(${this.props.address.landmark})`}
              </p>
              {this.props.address.landlineNumber && (
                <a href={`tel:${this.props.address.landlineNumber}`}>
                  <i className="fa fa-phone" />{" "}
                  {this.props.address.landlineNumber}
                </a>
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
                    <a href={`tel:${person.mobileNumber}`}>
                      <i className="fa fa-mobile"> {person.mobileNumber}</i>
                    </a>
                  ) : null}
                </div>
              ))}
              {/* <a
                href={
                  this.props.address.contactPerson &&
                  this.props.address.contactPerson[0] &&
                  `tel:${this.props.address.contactPerson[0].mobileNumber}`
                }
              >
                <Button primary className="mt-2">
                  Contact Now
                </Button>
              </a> */}
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
    return (
      this.props.branchAddress &&
      this.props.branchAddress.map(branch => (
        <Col sm="3">
          <Card className="mb-3">
            <Card.Content
              // header={branch.area ? `${branch.area.name} Branch` : "New Branch"}
              onClick={this.drawPath(branch)}
            >
              <Card.Header>
                <div
                  className="address-card-header"
                  data-tooltip={`Get Direction to this Address`}
                  data-position="bottom center"
                >
                  {branch.address_title}
                  <i className="fa fa-location-arrow" />
                </div>
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <p>
                {branch.area
                  ? `${branch.area.name}, ${branch.city.name}, ${
                      branch.district.name
                    }`
                  : null}
              </p>
              <p>{branch.landmark}</p>
              {branch.landlineNumber ? (
                <a href={`tel: ${branch.landlineNumber}`}>
                  <i className="fa fa-phone" /> {branch.landlineNumber}
                </a>
              ) : null}

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
                      <a href={`tel: ${person.mobileNumber}`}>
                        <i className="fa fa-mobile"> {person.mobileNumber}</i>
                      </a>
                    ) : null}
                  </div>
                ))}
              {/* <a
                href={`tel:${branch.contactPerson &&
                  // branch.contactPerson[0].mobileNumber &&
                  branch.contactPerson[0].mobileNumber}`}
              >
                <Button primary className="mt-2">
                  Contact Now
                </Button>
              </a> */}
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
    return (
      <div
        style={{
          paddingTop: "60px"
        }}
      >
        <MapComponent
          ref={ref => (this.mapEl = ref)}
          position={this.state.position}
          source={this.state.source}
          destination={this.state.destination}
          // onClick={this.onChangeLatLng}
          // onDragEnd={this.onChangeLatLng}
        />
        <Container>
          <Row className="mt-5 mb-4">
            <Col sm="12">
              <h2 className="text-center">
                we're always listening. Contact us Now!
              </h2>
            </Col>
          </Row>
          <Row className="mt-5 mb-5">
            {this.props.address && this.renderPrimaryAddress()}
            {this.props.branchAddress && this.renderBranchAddress()}
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
    },
    home: { user_geo_coords }
  }) => ({
    business_name,
    business_email,
    business_phone,
    address,
    branchAddress,
    user_geo_coords
  })
)(Contact);
