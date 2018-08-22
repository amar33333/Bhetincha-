import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import "react-input-range/lib/css/index.css";
import { Button, Loader } from "semantic-ui-react";
import querystring from "querystring";
import { isEmpty } from "lodash";

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
import Loading from "../../Common/pages/Loading";

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

class ResultPage extends Component {
  state = {
    frm: 0,
    size: 5,
    searchResults: null,
    search_results_count: 0,
    hasMoreItems: true,
    verifiedTooltipOpen: false,
    distance: 0,
    activeArea: "Area",
    areaName: ""
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
      body: {
        query: parsedUrlStringObject["query"],
        frm,
        size,
        lat: this.props.user_geo_coords
          ? this.props.user_geo_coords.latitude
          : undefined,
        lon: this.props.user_geo_coordsom
          ? this.props.user_geo_coords.longitude
          : undefined,
        distance: this.state.distance,
        typeOfArea: this.state.areaName ? this.state.activeArea : undefined,
        areaName: this.state.areaName ? this.state.areaName : undefined
      }
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
      this.setState(
        {
          frm: 0,
          areaName: "",
          activeArea: "Area"
        },
        () => {
          const { frm, size } = this.state;

          this.props.onSearchResultsList({
            body: {
              query: parsedUrlStringObject["query"],
              frm,
              size,
              lat: this.props.user_geo_coords
                ? this.props.user_geo_coords.latitude
                : undefined,
              lon: this.props.user_geo_coords
                ? this.props.user_geo_coords.longitude
                : undefined,
              distance: this.state.distance,
              typeOfArea: this.state.areaName
                ? this.state.activeArea
                : undefined,
              areaName: this.state.areaName ? this.state.areaName : undefined
            }
          });
          this.setState({ searchResults: null, frm: frm + size });
        }
      );
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
    // console.log("claim data: ", data);
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
        body: {
          query: parsedUrlStringObject["query"],
          frm,
          size,
          lat: this.props.user_geo_coords
            ? this.props.user_geo_coords.latitude
            : undefined,
          lon: this.props.user_geo_coords
            ? this.props.user_geo_coords.longitude
            : undefined,
          distance: this.state.distance,
          typeOfArea: this.state.areaName ? this.state.activeArea : undefined,
          areaName: this.state.areaName ? this.state.areaName : undefined
        }
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
    this.state.searchResults.hit.length
      ? this.state.searchResults.hit.map((each, index) => (
          <SearchCard
            key={index}
            searchResult={{
              ...each._source,
              id: each._id
            }}
            onClaimed={this.onClaimed}
            onImproveListingClicked={this.onImproveListingClicked}
            onGetDirectionClicked={this.onGetDirectionClicked}
          />
        ))
      : null;

  // renderBusinessMatch = () =>
  //   this.state.searchResults &&
  //   this.state.searchResults.hit &&
  //   this.state.searchResults.hit._source && (
  //     <SearchCard
  //       searchResult={{
  //         ...this.state.searchResults.hit._source,
  //         id: this.state.searchResults.hit._id
  //       }}
  //       onClaimed={this.onClaimed}
  //       onImproveListingClicked={this.onImproveListingClicked}
  //       onGetDirectionClicked={this.onGetDirectionClicked}
  //     />
  //   );

  renderSimilarSearchResults = () => {
    const parsedUrlStringObject = querystring.parse(
      this.props.location.search.slice(1)
    );
    if (this.state.searchResults) {
      const hits = this.state.searchResults.hits.hits;

      return hits.length ? (
        hits.map((searchResult, searchIndex) => {
          return (
            <SearchCard
              key={searchIndex}
              searchResult={{ ...searchResult._source, id: searchResult._id }}
              onClaimed={this.onClaimed}
              onImproveListingClicked={this.onImproveListingClicked}
              onGetDirectionClicked={this.onGetDirectionClicked}
            />
          );
        })
      ) : (
        <div>
          No Other Results for <strong>{parsedUrlStringObject["query"]}</strong>
        </div>
      );
    } else {
      if (!this.props.search_results_page_loading)
        return (
          <div>
            No Other Results for{" "}
            <strong>{parsedUrlStringObject["query"]}</strong>
          </div>
        );
      else return <Loading />;
    }
  };

  renderAddressSelectionButton = (key, val, index) =>
    key &&
    val && (
      <span className="mr-2" key={index}>
        <Button
          basic
          compact
          color={this.state.activeArea === key ? "blue" : "grey"}
          size="mini"
          onClick={() =>
            this.setState({ activeArea: key, areaName: val, frm: 0 }, () => {
              const parsedUrlStringObject = querystring.parse(
                this.props.location.search.slice(1)
              );
              const { frm, size } = this.state;

              this.props.onSearchResultsList({
                body: {
                  query: parsedUrlStringObject["query"],
                  frm,
                  size,
                  lat: this.props.user_geo_coords
                    ? this.props.user_geo_coords.latitude
                    : undefined,
                  lon: this.props.user_geo_coords
                    ? this.props.user_geo_coords.longitude
                    : undefined,
                  distance: this.state.distance,
                  typeOfArea: key,
                  areaName: val
                }
              });
              this.setState({
                searchResults: null,
                frm: frm + size
              });
            })
          }
        >
          {`${key}: ${val}`}
        </Button>
      </span>
    );

  renderAddressSelectionButtonOnClicked = (key, val) => () => {
    this.setState({ activeArea: key, areaName: val, frm: 0 }, () => {
      const parsedUrlStringObject = querystring.parse(
        this.props.location.search.slice(1)
      );
      const { frm, size } = this.state;

      this.props.onSearchResultsList({
        body: {
          query: parsedUrlStringObject["query"],
          frm,
          size,
          lat: this.props.user_geo_coords
            ? this.props.user_geo_coords.latitude
            : undefined,
          lon: this.props.user_geo_coords
            ? this.props.user_geo_coords.longitude
            : undefined,
          distance: this.state.distance,
          typeOfArea: key,
          areaName: val
        }
      });
      this.setState({ searchResults: null, frm: frm + size });
    });
  };

  renderAddressSelectionForSimilarSearchBusiness = () => {
    const parsedUrlStringObject = querystring.parse(
      this.props.location.search.slice(1)
    );

    let name = "";

    // const name =
    //   this.state.searchResults && this.state.searchResults.hits.hits.length
    //     ? this.state.searchResults.subCategoryName
    //       ? this.state.searchResults.subCategoryName
    //       : !this.state.searchResults.freeSearch && this.state.searchResults.cat
    //         ? this.state.searchResults.cat._source.name
    //         : parsedUrlStringObject["query"]
    //     : null;

    if (this.state.searchResults && this.state.searchResults.hits.hits.length) {
      if (this.state.searchResults.subCategoryName) {
        name = this.state.searchResults.subCategoryName;
      } else {
        if (
          this.state.searchResults.freeSearch &&
          !isEmpty(this.state.searchResults.cat)
        ) {
          name = this.state.searchResults.cat._source.name;
        } else {
          name = parsedUrlStringObject["query"];
        }
      }
    }
    // const name =
    //   (this.state.searchResults &&
    //     this.state.searchResults.hits.hits.length &&
    //     this.state.searchResults.subCategoryName) ||
    //   (this.state.searchResults &&
    //   !this.state.searchResults.freeSearch &&
    //   this.state.searchResults.hits.hits.length &&
    //   this.state.searchResults.cat
    //     ? this.state.searchResults.cat._source.name
    //     : parsedUrlStringObject["query"]);

    console.log("name: ", name);

    return (
      this.state.searchResults &&
      !this.state.searchResults.freeSearch &&
      name && (
        <Row style={{ paddingTop: "20px" }}>
          <Col xs="12" md="8">
            <span className="mr-3">
              Showing Results for <strong>{name}</strong> in{" "}
            </span>

            {this.state.searchResults.area && (
              <span className="mr-2">
                <Button
                  basic
                  compact
                  color={this.state.activeArea === "Area" ? "blue" : "grey"}
                  size="mini"
                  onClick={this.renderAddressSelectionButtonOnClicked(
                    "Area",
                    this.state.searchResults.area
                  )}
                >
                  Area: {this.state.searchResults.area}
                </Button>
              </span>
            )}
            {this.state.searchResults.city && (
              <span className="mr-2">
                <Button
                  compact
                  basic
                  color={this.state.activeArea === "City" ? "blue" : "grey"}
                  size="mini"
                  onClick={this.renderAddressSelectionButtonOnClicked(
                    "City",
                    this.state.searchResults.city
                  )}
                >
                  City: {this.state.searchResults.city}
                </Button>
              </span>
            )}
            {this.state.searchResults.district && (
              <span className="mr-2">
                <Button
                  compact
                  basic
                  color={this.state.activeArea === "District" ? "blue" : "grey"}
                  size="mini"
                  onClick={this.renderAddressSelectionButtonOnClicked(
                    "District",
                    this.state.searchResults.district
                  )}
                >
                  District: {this.state.searchResults.district}
                </Button>
              </span>
            )}
            {this.state.searchResults.state && (
              <span className="mr-2">
                <Button
                  compact
                  basic
                  color={this.state.activeArea === "State" ? "blue" : "grey"}
                  size="mini"
                  onClick={this.renderAddressSelectionButtonOnClicked(
                    "State",
                    this.state.searchResults.state
                  )}
                >
                  State:{this.state.searchResults.state}
                </Button>
              </span>
            )}
            {this.state.searchResults.country && (
              <span className="mr-2">
                <Button
                  compact
                  basic
                  color={this.state.activeArea === "Country" ? "blue" : "grey"}
                  size="mini"
                  onClick={this.renderAddressSelectionButtonOnClicked(
                    "Country",
                    this.state.searchResults.country
                  )}
                >
                  Country: {this.state.searchResults.country}
                </Button>
              </span>
            )}

            {/* {this.state.searchResults &&
              Object.keys(this.state.searchResults.similarSearchBusinessAddress)
                .reverse()
                .map((each, index) => {
                  return this.renderAddressSelectionButton(
                    each.replace(/\b\w/g, l => l.toUpperCase()),
                    this.state.searchResults.similarSearchBusinessAddress[each],
                    index
                  );
                })} */}
          </Col>
        </Row>
      )
    );
  };

  render() {
    // console.log("props: ", this.props);

    console.log("state: ", this.state);
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

          {/* {this.state.searchResults &&
            this.state.searchResults.subCategoryName && (
              <span className="mr-3">
                Showing Results For{" "}
                <strong>{this.state.searchResults.subCategoryName} </strong>
              </span>
            )} */}
          {this.renderAddressSelectionForSimilarSearchBusiness()}

          <Row style={{ paddingTop: "20px" }}>
            <Col xs="12" md="8">
              {this.renderSimilarSearchResults()}
            </Col>
          </Row>
          {this.props.search_results_count > this.state.size &&
          this.props.search_results_page_loading &&
          this.props.search_results_page_data.hits.hits.length
            ? loader
            : null}
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
