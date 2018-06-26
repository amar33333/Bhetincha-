import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Media,
  // Card,
  // CardBody,
  // CardFooter,
  Badge
} from "reactstrap";

import { MAIN_URL } from "../../Common/utils/API";

import { Card } from "semantic-ui-react";

// import avatar from "../../static/img/avatar.jpg";
// import avatar from "../../static/img/avatar.jpg";
import querystring from "querystring";

import { togglePhoneVerificationModal } from "../../actions";
import { onSearchResultsList } from "../actions";
import CustomModal from "../../Common/components/CustomModal";
import PhoneVerificationModal from "../../Common/components/CustomModal/ModalTemplates/PhoneVerificationModal";

class BusinessList extends Component {
  state = {
    verifiedTooltipOpen: false
  };
  componentDidMount() {
    const parsedUrlStringObject = querystring.parse(
      this.props.location.search.slice(1)
    );

    this.props.onSearchResultsList({
      query: parsedUrlStringObject["query"],
      frm: parsedUrlStringObject["frm"],
      size: parsedUrlStringObject["size"]
    });
    this.props.setInitialQuery(parsedUrlStringObject.query);
  }

  componentDidUpdate(prevProps, prevState) {
    const parsedUrlStringObject = querystring.parse(
      this.props.location.search.slice(1)
    );

    if (this.props.location.search !== prevProps.location.search)
      this.props.onSearchResultsList({
        query: parsedUrlStringObject["query"],
        frm: parsedUrlStringObject["frm"],
        size: parsedUrlStringObject["size"]
      });
  }

  onClaimed = id => () => {
    this.props.togglePhoneVerificationModal({ id });
  };

  onImproveListingClicked = id => () => {
    console.log("imporve listing: ", id);
  };

  toggleVerifiedTooltip = () => {
    this.setState({
      verifiedTooltipOpen: !this.state.verifiedTooltipOpen
    });
  };
  renderSearchResults = () => {
    // console.log("search results: ", this.props);
    if (!this.props.search_results_page_loading)
      if (!this.props.search_results_page_data.length)
        return <div>No Results Found !!!</div>;
      else
        return this.props.search_results_page_data.map(each_search_result => {
          return (
            <Card fluid>
              <Card.Content>
                <Media>
                  <Media left href="#">
                    <Media
                      object
                      // data-src={avatar}
                      src={
                        each_search_result.logo
                          ? `${MAIN_URL}${each_search_result.logo}`
                          : `${MAIN_URL}/media/default_logo.png`
                      }
                      className="result-page__thumbnail"
                      alt="Generic placeholder image"
                    />
                  </Media>
                  <Media body>
                    <Media heading className="result-header__text">
                      {each_search_result.business_name}{" "}
                      {each_search_result.verified && (
                        <span data-tooltip="Verified">
                          <i
                            className="fa fa-check-circle"
                            style={{ color: "green" }}
                            // data-tooltip="Add users to your feed"
                          />
                        </span>
                      )}
                    </Media>
                    <div className="mb-1">
                      <Badge color="warning" pill className="mr-1">
                        {each_search_result.industry}
                      </Badge>
                      {each_search_result.categories &&
                        each_search_result.categories.map(category => (
                          <Badge
                            color="info"
                            pill
                            className="mr-1"
                            style={{ color: "white" }}
                          >
                            {category}
                          </Badge>
                        ))}
                    </div>
                    <span
                      data-tooltip="Get Direction"
                      data-position="right center"
                    >
                      <i className="fa fa-map-marker" />{" "}
                      {each_search_result.address.area.area},{" "}
                      {each_search_result.address.area.city} <br />
                    </span>
                    {each_search_result.business_phone ? (
                      <div style={{ color: "rgb(35, 35, 34)" }}>
                        <i className="fa fa-phone" />{" "}
                        {each_search_result.business_phone}
                      </div>
                    ) : null}
                    {each_search_result.business_email ? (
                      <div style={{ color: "rgb(35, 35, 34)" }}>
                        <i className="fa fa-envelope" />{" "}
                        {each_search_result.business_email}
                      </div>
                    ) : null}

                    {/* <div
                      className="fa-stack fa-sm"
                      style={{ color: "rgb(35, 35, 34)" }}
                    >
                      <i className="fa fa-circle-thin fa-stack-2x" />
                      <i className="fa fa-globe fa-stack-1x" />
                    </div> */}
                  </Media>
                </Media>
              </Card.Content>
              <Card.Content>
                <Row>
                  {/* <Col sm="2">
                    <i className="fa fa-thumbs-up" />
                    <Badge color="warning" pill>
                      23
                    </Badge>
                  </Col> */}
                  <Col
                    sm="2"
                    style={{ cursor: "pointer" }}
                    onClick={this.onClaimed(each_search_result.id)}
                  >
                    <i className="fa fa-unlock" /> Claim
                  </Col>
                  <Col
                    sm="3"
                    style={{ cursor: "pointer" }}
                    onClick={this.onImproveListingClicked(
                      each_search_result.id
                    )}
                  >
                    <i className="fa fa-list" /> Improve Listing
                  </Col>
                  <Col sm="2">
                    <i className="fa fa-eye" /> 222
                  </Col>
                  <Col sm="2">
                    <i className="fa fa-search" /> 5555
                  </Col>
                  <Col sm="2">
                    <i className="fa fa-star" /> 4.5
                  </Col>
                </Row>
              </Card.Content>
              {/* <div
                style={{
                  position: "absolute",
                  backgroundColor: "#0719ece0",
                  // opacity: 0.5,
                  padding: 10,
                  color: "white",
                  top: 0,
                  right: 0
                }}
              >
                Business
              </div> */}
            </Card>
          );
        });
  };

  render() {
    console.log("business list: ", this.props);

    return (
      <div className="body-wrapper mb-5">
        <Container fluid>
          <Row style={{ marginTop: 20 }}>
            <Col xs="12" md="8">
              {this.renderSearchResults()}
            </Col>
          </Row>
        </Container>
        <CustomModal
          title="Verification: Mobile Number"
          isOpen={this.props.phoneVerificationModal}
          toggle={this.props.togglePhoneVerificationModal}
          className={"modal-xs" + this.props.className}
        >
          <PhoneVerificationModal {...this.props} />
        </CustomModal>
      </div>
    );
  }
}

export default connect(
  ({ auth: { cookies, phoneVerificationModal }, home, search_result }) => ({
    cookies,
    ...home,
    phoneVerificationModal,
    ...search_result
  }),
  {
    togglePhoneVerificationModal,
    onSearchResultsList
  }
)(BusinessList);
