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

import { Card, Divider, Button, Loader } from "semantic-ui-react";
import moment from "moment";
// import avatar from "../../static/img/avatar.jpg";
// import avatar from "../../static/img/avatar.jpg";
import querystring from "querystring";

import { Link } from "react-router-dom";

import {
  togglePhoneVerificationModal,
  onPhoneVerificationRequest,
  onResetPhoneVerificationRequestError
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

import { SearchCard } from "./Components";

class ResultPage extends Component {
  state = {
    frm: 0,
    size: 5,
    searchResults: null,
    search_results_count: 0,
    hasMoreItems: true,
    verifiedTooltipOpen: false,
    distance: 0,
    activeArea: "area"
  };

  componentDidMount = () => {
    const parsedUrlStringObject = querystring.parse(
      this.props.location.search.slice(1)
    );
    // console.log("propop: ", this.props, parsedUrlStringObject);

    if (!this.props.location.search) this.props.history.replace("/404");
    else {
      if (!parsedUrlStringObject["query"]) this.props.history.replace("/404");
    }

    window.addEventListener("scroll", this.onScroll, false);

    const { frm, size } = this.state;

    this.props.onSearchResultsList({
      query: parsedUrlStringObject["query"],
      frm,
      size,
      lat: this.props.user_geo_coords
        ? this.props.user_geo_coords.latitude
        : undefined,
      lon: this.props.user_geo_coords
        ? this.props.user_geo_coords.longitude
        : undefined,
      distance: this.state.distance
    });

    this.setState({ frm: frm + size });

    this.props.setInitialQuery(parsedUrlStringObject.query);
  };

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
          lat: this.props.user_geo_coords
            ? this.props.user_geo_coords.latitude
            : undefined,
          lon: this.props.user_geo_coords
            ? this.props.user_geo_coords.longitude
            : undefined,
          distance: this.state.distance
        });
        this.setState({ frm: frm + size });
      });
    }

    if (
      this.props.search_results_page_data !== prevProps.search_results_page_data
    ) {
      const hits = this.state.searchResults
        ? this.state.searchResults.hits.hits
        : [];

      this.setState({
        searchResults: {
          ...this.props.search_results_page_data,
          hits: {
            hits: [...hits, ...this.props.search_results_page_data.hits.hits]
          }
        }
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  onClaimed = data => () => {
    console.log("claim data: ", data);
    this.props.togglePhoneVerificationModal({ ...data });
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
      this.props.search_results_page_data &&
      this.props.search_results_page_data.hits.hits.length &&
      !this.props.search_results_page_loading
    ) {
      const { frm, size } = this.state;

      this.props.onSearchResultsList({
        query: parsedUrlStringObject["query"],
        frm,
        size,
        lat: this.props.user_geo_coords
          ? this.props.user_geo_coords.latitude
          : undefined,
        lon: this.props.user_geo_coords
          ? this.props.user_geo_coords.longitude
          : undefined,
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
      addresses = [{ ...primary_address, address_title: "Head Office" }];
    if (branchAddress && branchAddress.length)
      addresses = [...addresses, ...branchAddress];

    this.props.toggleGetDirectionModal({
      source,
      addresses
    });
  };

  renderBusinessMatch = () =>
    this.state.searchResults &&
    this.state.searchResults.hit &&
    this.state.searchResults.hit._source && (
      <SearchCard
        searchResult={this.state.searchResults.hit._source}
        onClaimed={this.onClaimed}
        onImproveListingClicked={this.onImproveListingClicked}
        onGetDirectionClicked={this.onGetDirectionClicked}
      />
    );

  renderSimilarSearchResults = () => {
    const parsedUrlStringObject = querystring.parse(
      this.props.location.search.slice(1)
    );

    if (this.state.searchResults) {
      const hits = this.state.searchResults.hits.hits;

      return (
        hits.length &&
        hits.map((searchResult, searchIndex) => {
          return (
            <SearchCard
              key={searchIndex}
              searchResult={searchResult._source}
              onClaimed={this.onClaimed}
              onImproveListingClicked={this.onImproveListingClicked}
              onGetDirectionClicked={this.onGetDirectionClicked}
            />
          );
        })
      );
    } else {
      return (
        <div>
          No Results for <strong>{parsedUrlStringObject["query"]}</strong>
        </div>
      );
    }

    // if (!this.state.searchResults) {
    //   console.log("no search resuls");
    //   return (
    //     <div>
    //       No Results for <strong>{parsedUrlStringObject["query"]}</strong>
    //     </div>
    //   );
    // } else {
    //   console.log("SEARCH resuls: ", this.state.searchResults);

    //   return (
    //     this.state.searchResults.businessMatch.hits.length &&
    //     this.state.searchResults.businessMatch.hits.map(
    //       (searchResult, searchIndex) => {
    //         var momentNow = moment().format("hh:mm A");
    //         var today = moment().format("dddd");

    //         return (
    //           <SearchCard
    //             searchResult={searchResult}
    //             searchIndex={searchIndex}
    //             momentNow={momentNow}
    //             today={today}
    //             onClaimed={this.onClaimed}
    //             onImproveListingClicked={this.onImproveListingClicked}
    //             onGetDirectionClicked={this.onGetDirectionClicked}
    //           />
    //         );
    //       }
    //     )
    //   );
    // }
  };

  renderSimilarResults = () => {
    return (
      <Card fluid raised className="search-result__card">
        <Card.Content>
          <Media>
            <Media object src="" />
            <Media body>
              <p>Similar</p>
            </Media>
          </Media>
        </Card.Content>
      </Card>
    );
  };

  render() {
    const loader = (
      <div
        className="loader"
        style={{
          marginBottom: "30px"
        }}
      >
        <Loader active inline="centered">
          Loading
        </Loader>
      </div>
    );
    // console.log("props: ", this.props);

    // console.log("state: ", this.state);
    return (
      <div
        className="pb-5"
        style={{
          minHeight: "85vh",
          backgroundColor: "#f3f3f3"
        }}
      >
        <Container fluid>
          {/* <Row style={{ paddingTop: "20px" }} className="mb-5 result-page-meta">
            <Col xs="5">
              <small>
                {`About ${this.props.search_results_count} results in ${this
                  .props.time_taken / 1000}s`}
              </small>
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
                        lat: this.props.user_geo_coords
                          ? this.props.user_geo_coords.latitude
                          : undefined,
                        lon: this.props.user_geo_coords
                          ? this.props.user_geo_coords.longitude
                          : undefined,
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
          </Row> */}
          <Row style={{ paddingTop: "20px" }}>
            <Col xs="12" md="8">
              {this.renderBusinessMatch()}
            </Col>
          </Row>
          <Row style={{ paddingTop: "20px" }}>
            <Col xs="12" md="8">
              <span className="mr-3">Similar Business in </span>
              <span className="mr-2">
                <Button
                  basic
                  compact
                  color={this.state.activeArea === "area" ? "blue" : "grey"}
                  size="mini"
                  onClick={() => this.setState({ activeArea: "area" })}
                >
                  Area: Kathmandu
                </Button>
              </span>
              <span className="mr-2">
                <Button
                  compact
                  basic
                  color={this.state.activeArea === "city" ? "blue" : "grey"}
                  size="mini"
                  onClick={() => this.setState({ activeArea: "city" })}
                >
                  City: Kathmandu
                </Button>
              </span>
              <span className="mr-2">
                <Button
                  compact
                  basic
                  color={this.state.activeArea === "district" ? "blue" : "grey"}
                  size="mini"
                  onClick={() => this.setState({ activeArea: "district" })}
                >
                  District: Kathmandu
                </Button>
              </span>
              <span className="mr-2">
                <Button
                  compact
                  basic
                  color={this.state.activeArea === "state" ? "blue" : "grey"}
                  size="mini"
                  onClick={() => this.setState({ activeArea: "state" })}
                >
                  State: State 3
                </Button>
              </span>
              {this.renderSimilarSearchResults()}
              {this.props.search_results_count > this.state.size &&
              this.props.search_results_page_loading &&
              this.props.search_results_page_data.hits.hits.length
                ? loader
                : null}
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
            search_selected_business={this.props.search_selected_business}
            onPhoneVerificationRequest={this.props.onPhoneVerificationRequest}
            phone_verification_request_error={
              this.props.phone_verification_request_error
            }
            onResetPhoneVerificationRequestError={
              this.props.onResetPhoneVerificationRequestError
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
      search_selected_business,
      phone_verification_request_error
    },
    home,
    search_result
  }) => ({
    cookies,
    ...home,
    phoneVerificationModal,
    ...search_result,
    search_selected_business,
    phone_verification_request_error
  }),
  {
    togglePhoneVerificationModal,
    toggleGetDirectionModal,
    toggleImproveListingModal,
    onSearchResultsList,
    onPhoneVerificationRequest,
    onProblemTypesList,
    onImproveListing,
    onResetPhoneVerificationRequestError
  }
)(ResultPage);
