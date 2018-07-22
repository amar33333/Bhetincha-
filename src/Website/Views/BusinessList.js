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
// import { geolocated } from "react-geolocated";
import InputRange from "react-input-range";

import "react-input-range/lib/css/index.css";

import { MAIN_URL } from "../../Common/utils/API";

import {
  Card,
  Divider,
  Button,
  Input,
  Dimmer,
  Loader
} from "semantic-ui-react";
import moment from "moment";
// import avatar from "../../static/img/avatar.jpg";
// import avatar from "../../static/img/avatar.jpg";
import querystring from "querystring";

import { Link } from "react-router-dom";

import {
  togglePhoneVerificationModal,
  onPhoneVerificationRequest
} from "../../actions";

import {
  toggleImproveListingModal,
  onProblemTypesList,
  onImproveListing,
  toggleGetDirectionModal
} from "../actions";

import { onSearchResultsList } from "../actions";
import CustomModal from "../../Common/components/CustomModal";
import PhoneVerificationModal from "../../Common/components/CustomModal/ModalTemplates/PhoneVerificationModal";
import ImproveListingModal from "../../Common/components/CustomModal/ModalTemplates/ImproveListingModal";
import GetDirectionModal from "../../Common/components/CustomModal/ModalTemplates/GetDirectionModal";

class BusinessList extends Component {
  state = {
    frm: 0,
    size: 5,
    searchResults: [],
    search_results_count: 0,
    hasMoreItems: true,
    verifiedTooltipOpen: false,
    distance: 0
  };

  componentDidMount = () => {
    window.addEventListener("scroll", this.onScroll, false);
    const parsedUrlStringObject = querystring.parse(
      this.props.location.search.slice(1)
    );

    const { frm, size } = this.state;

    this.props.onSearchResultsList({
      query: parsedUrlStringObject["query"],
      frm,
      size,
      lat: parsedUrlStringObject["lat"],
      lon: parsedUrlStringObject["lon"],
      distance: this.state.distance
    });

    this.setState({ frm: frm + size });

    this.props.setInitialQuery(parsedUrlStringObject.query);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  componentDidUpdate(prevProps, prevState) {
    const parsedUrlStringObject = querystring.parse(
      this.props.location.search.slice(1)
    );

    // console.log("pasdara: ", parsedUrlStringObject);

    if (this.props.location.search !== prevProps.location.search) {
      this.setState({ frm: 0 }, () => {
        const { frm, size } = this.state;

        this.props.onSearchResultsList({
          query: parsedUrlStringObject["query"],
          frm,
          size,
          lat: parsedUrlStringObject["lat"],
          lon: parsedUrlStringObject["lon"],
          distance: this.state.distance
        });
        this.setState({ searchResults: [], frm: frm + size });
      });
    }

    if (
      this.props.search_results_page_data !== prevProps.search_results_page_data
    ) {
      this.setState({
        searchResults: [
          ...this.state.searchResults,
          ...this.props.search_results_page_data
        ]
      });
    }
  }

  onClaimed = id => () => {
    this.props.togglePhoneVerificationModal({ id });
  };

  onImproveListingClicked = data => () => {
    this.props.toggleImproveListingModal({ ...data });
  };

  onScroll = () => {
    const parsedUrlStringObject = querystring.parse(
      this.props.location.search.slice(1)
    );

    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    const windowBottom = windowHeight + window.pageYOffset;
    if (
      windowBottom >= docHeight &&
      this.props.search_results_page_data.length &&
      !this.props.search_results_page_loading
    ) {
      const { frm, size } = this.state;

      this.props.onSearchResultsList({
        query: parsedUrlStringObject["query"],
        frm,
        size,
        lat: parsedUrlStringObject["lat"],
        lon: parsedUrlStringObject["lon"],
        distance: this.state.distance
      });
      this.setState({ frm: frm + size });
    }
  };

  toggleVerifiedTooltip = () => {
    this.setState({
      verifiedTooltipOpen: !this.state.verifiedTooltipOpen
    });
  };

  onGetDirectionClicked = ({ primary_address, branchAddress }) => () => {
    const source = {
      latitude:
        this.props.user_geo_coords && this.props.user_geo_coords.latitude,
      longitude:
        this.props.user_geo_coords && this.props.user_geo_coords.longitude
    };

    let addresses = [];

    if (primary_address)
      addresses = [{ ...primary_address, address_title: "Primary Address" }];
    if (branchAddress && branchAddress.length)
      addresses = [...addresses, ...branchAddress];

    this.props.toggleGetDirectionModal({
      source,
      addresses
    });
  };

  renderSearchResults = () => {
    // console.log("search results: ", this.props);
    // if (!this.props.search_results_page_loading)
    if (
      !this.props.search_results_page_loading &&
      !this.state.searchResults.length
    )
      return <div>No Results Found !!!</div>;
    else
      return this.state.searchResults.map((each_search_result, Searchindex) => {
        var momentNow = moment().format("hh:mm A");
        var today = moment().format("dddd");

        return (
          <Card fluid key={Searchindex}>
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
                <Media body className="ml-3">
                  <small>Business</small>
                  <Media className="result-header__text">
                    <Link to={each_search_result.slug}>
                      {each_search_result.business_name}{" "}
                      {each_search_result.verified && (
                        <span data-tooltip="Verified">
                          <i
                            className="fa fa-check-circle"
                            style={{ color: "green", fontSize: "1.2rem" }}
                            // data-tooltip="Add users to your feed"
                          />
                        </span>
                      )}
                    </Link>
                  </Media>
                  <div className="mb-1">
                    <Badge color="warning" pill className="mr-1">
                      {each_search_result.industry}
                    </Badge>
                    {each_search_result.categories &&
                      each_search_result.categories.map((category, index) => (
                        <Badge
                          key={index}
                          color="info"
                          pill
                          className="mr-1"
                          style={{ color: "white" }}
                        >
                          {category}
                        </Badge>
                      ))}
                  </div>
                  {each_search_result.address ? (
                    <span
                      // data-tooltip="Get Direction"
                      // data-position="right center"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {/* <i className="fa fa-map-marker" />{" "} */}
                      {each_search_result.address &&
                        each_search_result.address.area &&
                        `${each_search_result.address.area.area},`}{" "}
                      {each_search_result.address &&
                        each_search_result.address.area &&
                        each_search_result.address.area.city}{" "}
                      <br />
                    </span>
                  ) : null}

                  {each_search_result.business_phone ? (
                    <div style={{ color: "rgb(35, 35, 34)" }}>
                      <i className="fa fa-phone" />{" "}
                      {each_search_result.business_phone}
                    </div>
                  ) : null}
                  {each_search_result.business_email ? (
                    <div style={{ color: "rgb(35, 35, 34)" }}>
                      <i className="fa fa-envelope-o" />{" "}
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
              <Divider />
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
                  <Button circular basic>
                    <i className="fa fa-unlock" /> Claim
                  </Button>
                </Col>
                <Col
                  sm="3"
                  style={{ cursor: "pointer" }}
                  onClick={this.onImproveListingClicked(each_search_result)}
                >
                  <Button circular basic>
                    <i className="fa fa-list" /> Improve Listing
                  </Button>
                </Col>
                {/* <Col sm="2">
                  <i className="fa fa-envelope-o" /> Email
                </Col>
                <Col sm="2">
                  <i className="fa fa-phone" /> Call
                </Col> */}
                <Col sm="3">
                  <Button
                    circular
                    basic
                    onClick={this.onGetDirectionClicked({
                      primary_address: each_search_result.address,
                      branchAddress: each_search_result.branchAddress
                    })}
                  >
                    <i className="fa fa-location-arrow" /> Get Direction{" "}
                  </Button>
                </Col>
                {each_search_result.industry === "Restaurants" ? (
                  <Col sm="3">
                    <Button circular basic>
                      <i className="fa fa-cutlery" aria-hidden="true" /> View
                      Menu
                    </Button>
                  </Col>
                ) : null}
              </Row>
            </Card.Content>
            <div
              style={{
                position: "absolute",
                // backgroundColor: "#0719ece0",
                // opacity: 0.5,
                padding: 10,
                color: "inherit",
                top: "0px",
                right: "10px"
              }}
            >
              {each_search_result.workingHour &&
                each_search_result.workingHour.map((day, index) => {
                  let newStart = day.start + "Z";
                  newStart = moment(newStart).format("hh:mm A");
                  let newEnd = day.end + "Z";
                  newEnd = moment(newEnd).format("hh:mm A");
                  if (day.day === today && each_search_result.alwaysOpen) {
                    return (
                      <small
                        key={index}
                        data-tooltip={`Always Open`}
                        data-position="bottom center"
                      >
                        <i className="fa fa-clock-o" /> Open Now
                      </small>
                    );
                  } else if (day.day === today && !day.holiday) {
                    if (
                      moment(momentNow, "hh:mm A").isBetween(
                        moment(newStart, "hh:mm A"),
                        moment(newEnd, "hh:mm A")
                      )
                    ) {
                      return (
                        <small
                          key={index}
                          data-tooltip={`${newStart} - ${newEnd}`}
                          data-position="bottom center"
                        >
                          <i className="fa fa-clock-o" /> Open Now
                        </small>
                      );
                    } else if (day.day === today && day.holiday) {
                      return (
                        <small
                          key={index}
                          data-tooltip={`${newStart} - ${newEnd}`}
                          data-position="bottom center"
                          style={{ color: "red" }}
                        >
                          Holiday
                        </small>
                      );
                    } else {
                      return (
                        <small
                          key={index}
                          data-tooltip={`${newStart} - ${newEnd}`}
                          data-position="bottom center"
                          style={{ color: "red" }}
                        >
                          Closed
                        </small>
                      );
                    }
                  } else {
                    return null;
                  }
                })}
            </div>
          </Card>
        );
      });
  };

  render() {
    // console.log("business list: ", this.props);
    // console.log("business list state: ", this.state);
    // this.props.search_result && console.log(this.props.search_result);
    const loader = (
      <div className="loader">
        <Loader active inline="centered">
          Loading
        </Loader>
      </div>
    );
    return (
      <div
        className="mb-5"
        style={{
          backgroundColor: "#f3f3f3"
        }}
      >
        <Container fluid>
          <Row style={{ paddingTop: "20px" }} className="mb-5 result-page-meta">
            <Col xs="5">
              <small>
                {`About ${this.props.search_results_count} results in ${this
                  .props.time_taken / 1000}s`}
              </small>
              {/* <p>
                Your Position: {this.props.coords && this.props.coords.latitude},{" "}
                {this.props.coords && this.props.coords.longitude}
              </p> */}
            </Col>
            <Col xs="3">
              <div className="mb-2">
                <small>
                  Limit Search Distance:{" "}
                  {this.state.distance === 0
                    ? "No limit"
                    : `${this.state.distance} KM`}
                </small>
              </div>
              <InputRange
                id="distance-range-selector"
                maxValue={20}
                minValue={0}
                step={1}
                value={this.state.distance}
                onChange={value => {
                  this.setState({
                    distance: value
                  });
                }}
                onChangeComplete={value => {
                  this.setState(
                    {
                      frm: 0
                    },
                    () => {
                      const parsedUrlStringObject = querystring.parse(
                        this.props.location.search.slice(1)
                      );

                      const { frm, size } = this.state;

                      this.props.onSearchResultsList({
                        query: parsedUrlStringObject["query"],
                        frm,
                        size,
                        lat: parsedUrlStringObject["lat"],
                        lon: parsedUrlStringObject["lon"],
                        distance: this.state.distance
                      });
                      this.setState({
                        searchResults: [],
                        frm: frm + size
                      });
                    }
                  );
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col xs="12" md="8">
              {this.renderSearchResults()}
              {this.props.search_results_count > this.state.size &&
              this.props.search_results_page_loading &&
              this.props.search_results_page_data.length
                ? loader
                : null}
              {/* <InfiniteScroll
                pageStart={0}
                loadMore={this.loadSearchItems}
                hasMore={this.state.hasMoreItems}
                loader={loader}
                threshold={0}
              >
                <div className="tracks">{items}</div> 
              </InfiniteScroll> */}
            </Col>
          </Row>
        </Container>
        <CustomModal
          title="Verification: Mobile Number"
          isOpen={this.props.phoneVerificationModal}
          toggle={this.props.togglePhoneVerificationModal}
          className={"modal-xs" + this.props.className}
        >
          <PhoneVerificationModal
            search_selected_business_id={this.props.search_selected_business_id}
            onPhoneVerificationRequest={this.props.onPhoneVerificationRequest}
            phone_verification_request_error={
              this.props.phone_verification_request_error
            }
            history={this.props.history}
          />
        </CustomModal>
        <CustomModal
          title="Improve Listing"
          isOpen={this.props.improveListingModal}
          toggle={this.props.toggleImproveListingModal}
          className={"modal-xs" + this.props.className}
        >
          <ImproveListingModal
            data={this.props.improveListingData}
            onImproveListing={this.props.onImproveListing}
            onProblemTypesList={this.props.onProblemTypesList}
            problem_types={this.props.problem_types}
          />
        </CustomModal>
        <CustomModal
          title="Get Direction"
          isOpen={this.props.getDirectionModal}
          toggle={this.props.toggleGetDirectionModal}
          className={"modal-xs" + this.props.className}
          size="lg"
        >
          <GetDirectionModal data={this.props.getDirectionData} />
        </CustomModal>
      </div>
    );
  }
}

export default connect(
  ({
    auth: {
      cookies,
      phoneVerificationModal,
      search_selected_business_id,
      phone_verification_request_error
    },
    home,
    search_result
  }) => ({
    cookies,
    ...home,
    phoneVerificationModal,
    ...search_result,
    search_selected_business_id,
    phone_verification_request_error
  }),
  {
    togglePhoneVerificationModal,
    toggleGetDirectionModal,
    toggleImproveListingModal,
    onSearchResultsList,
    onPhoneVerificationRequest,
    onProblemTypesList,
    onImproveListing
  }
)(BusinessList);
