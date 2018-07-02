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
    verifiedTooltipOpen: false
  };

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);
    const parsedUrlStringObject = querystring.parse(
      this.props.location.search.slice(1)
    );

    this.props.onSearchResultsList({
      query: parsedUrlStringObject["query"],
      frm: 0,
      size: 5
    });

    const { frm, size } = this.state;
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
      this.props.onSearchResultsList({
        query: parsedUrlStringObject["query"],
        frm: 0,
        size: 5
      });

      this.setState({ searchResults: [], frm: 0 });
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

    const innerPlusScrollY = window.innerHeight + window.scrollY;
    const bodyOffsetHeight = document.body.offsetHeight;
    console.log(
      "inner: ",
      innerPlusScrollY,
      " bodyofffset: ",
      bodyOffsetHeight
    );
    if (
      innerPlusScrollY >= bodyOffsetHeight &&
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
                    <Link to={each_search_result.slug}>
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
                      data-tooltip="Get Direction"
                      data-position="right center"
                    >
                      <i className="fa fa-map-marker" />{" "}
                      {each_search_result.address &&
                        `${each_search_result.address.area.area},`}{" "}
                      {each_search_result.address &&
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
                  onClick={this.onImproveListingClicked(each_search_result.id)}
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
    // console.log("business list: ", this.props);
    // console.log("business list state: ", this.state);
    this.props.search_result && console.log(this.props.search_result);
    const loader = <div className="loader">Loading ...</div>;

    return (
      <div className="mb-5">
        <Container fluid>
          <Row style={{ marginTop: "20px", paddingTop: "80px" }}>
            <Col xs="12">
              <small>
                {`About ${this.props.search_results_count} results in 0.002s`}
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
  ({
    auth: { cookies, phoneVerificationModal },
    home,
    search_result,
    search_results_count
  }) => ({
    cookies,
    ...home,
    phoneVerificationModal,
    ...search_result,
    search_results_count
  }),
  {
    togglePhoneVerificationModal,
    onSearchResultsList
  }
)(BusinessList);
