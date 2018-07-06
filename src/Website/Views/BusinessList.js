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
import { Slider } from "react-semantic-ui-range";

import { MAIN_URL } from "../../Common/utils/API";

import { Card, Divider, Button, Input } from "semantic-ui-react";
import moment from "moment";
// import avatar from "../../static/img/avatar.jpg";
// import avatar from "../../static/img/avatar.jpg";
import querystring from "querystring";

import { Link } from "react-router-dom";

import { togglePhoneVerificationModal } from "../../actions";
import { onSearchResultsList } from "../actions";
import CustomModal from "../../Common/components/CustomModal";
import PhoneVerificationModal from "../../Common/components/CustomModal/ModalTemplates/PhoneVerificationModal";

class BusinessList extends Component {
  state = {
    frm: 0,
    size: 5,
    searchResults: [],
    search_results_count: 0,
    hasMoreItems: true,
    verifiedTooltipOpen: false,
    distanceValue: 0
  };

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);
    const parsedUrlStringObject = querystring.parse(
      this.props.location.search.slice(1)
    );

    const { frm, size } = this.state;

    this.props.onSearchResultsList({
      query: parsedUrlStringObject["query"],
      frm,
      size
    });

    this.setState({ frm: frm + size });

    this.props.setInitialQuery(parsedUrlStringObject.query);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  componentDidUpdate(prevProps, prevState) {
    const parsedUrlStringObject = querystring.parse(
      this.props.location.search.slice(1)
    );

    if (this.props.location.search !== prevProps.location.search) {
      this.setState({ frm: 0 }, () => {
        const { frm, size } = this.state;

        this.props.onSearchResultsList({
          query: parsedUrlStringObject["query"],
          frm,
          size
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

  onImproveListingClicked = id => () => {
    console.log("imporve listing: ", id);
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
      console.log("onScroll frm: ", frm);

      this.props.onSearchResultsList({
        query: parsedUrlStringObject["query"],
        frm,
        size
      });
      this.setState({ frm: frm + size });
    }
  };

  toggleVerifiedTooltip = () => {
    this.setState({
      verifiedTooltipOpen: !this.state.verifiedTooltipOpen
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
      return this.state.searchResults.map(each_search_result => {
        var momentNow = moment().format("hh:mm A");
        var today = moment().day();
        console.log("today:", today);

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
                  onClick={this.onImproveListingClicked(each_search_result.id)}
                >
                  <Button circular basic>
                    <i className="fa fa-list" /> Improve Listing{" "}
                  </Button>
                </Col>
                {/* <Col sm="2">
                  <i className="fa fa-envelope-o" /> Email
                </Col>
                <Col sm="2">
                  <i className="fa fa-phone" /> Call
                </Col> */}
                <Col sm="3">
                  <Button circular basic>
                    <i className="fa fa-location-arrow" /> Get Direction{" "}
                  </Button>
                </Col>
              </Row>
            </Card.Content>
            <div
              style={{
                position: "absolute",
                // backgroundColor: "#0719ece0",
                // opacity: 0.5,
                padding: 10,
                color: "inherit",
                top: "10px",
                right: "10px"
              }}
            >
              {each_search_result.workingHour &&
                each_search_result.workingHour.map((day, index) => {
                  let start = moment(day.start)
                    .add({ hours: 5, minutes: 45 })
                    .format("hh:mm A");
                  let end = moment(day.end)
                    .add({ hours: 5, minutes: 45 })
                    .format("hh:mm A");
                  console.log(
                    each_search_result.business_name,
                    "Now:",
                    momentNow,
                    "start:",
                    start,
                    "end:",
                    end
                  );
                  if (index === today) {
                    console.log("today");
                    if (
                      moment(momentNow, "hh:mm A").isBetween(
                        moment(start, "hh:mm A"),
                        moment(end, "hh:mm A")
                      )
                    ) {
                      return (
                        <small
                          data-tooltip={`${start} - ${end}`}
                          data-position="bottom center"
                        >
                          <i className="fa fa-clock-o" /> Open Now
                        </small>
                      );
                    } else {
                      return (
                        <small
                          data-tooltip={`${start} - ${end}`}
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
    this.props.search_result && console.log(this.props.search_result);
    const loader = <div className="loader">Loading ...</div>;
    const settings = {
      start: 0,
      min: 0,
      max: 200,
      step: 20
    };
    return (
      <div
        className="mb-5"
        style={{
          backgroundColor: "#f3f3f3"
        }}
      >
        <Container fluid>
          <Row style={{ paddingTop: "20px" }}>
            <Col xs="5">
              <small>
                {`About ${this.props.search_results_count} results in ${this
                  .props.time_taken / 1000}s`}
              </small>
            </Col>
            <Col xs="3">
              <small>
                Limit Search Distance:{" "}
                {this.state.distanceValue === 0
                  ? "No limit"
                  : `${this.state.distanceValue} KM`}
                <Slider
                  discrete
                  color="red"
                  inverted={false}
                  settings={{
                    start: this.state.distanceValue,
                    min: 0,
                    max: 200,
                    step: 20,
                    onChange: value => {
                      this.setState({
                        distanceValue: value
                      });
                    }
                  }}
                />
              </small>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col xs="12" md="8">
              {this.renderSearchResults()}
              {this.props.search_results_page_loading &&
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
