import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Button, Image, Label, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { MAIN_URL } from "../../../Common/utils/API";
import { ROUTE_PARAMS_BUSINESS_NAME } from "../../../config/CONSTANTS";
import defaultThumbnail from "../../../static/img/defaultThumbnail.jpg";

class GalleryList extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            {this.props.albums.length === 0 ? `No Galleries found!` : null}
            {this.props.albums &&
              this.props.albums.map(album => {
                var src =
                  (album.photos[0] &&
                    `${MAIN_URL}${album.photos[0].photoURL}`) ||
                  defaultThumbnail;
                return (
                  <Col xs="12" md="3" key={album.albumID}>
                    <Segment
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0px",
                        minHeight: "200px"
                      }}
                    >
                      <Link
                        to={`${this.props.routeURL}/${album.albumID}`}
                        // to={`/${
                        //   this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
                        // }/gallery/${album.albumID}`}
                      >
                        <Image
                          src={src}
                          className="minisite__album-thumbnail"
                        />
                      </Link>
                      {/* <Image
                  as="a"
                  href={`/${
                    this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
                  }/gallery/${album.albumID}`}
                  src={src}
                  className="minisite__album-thumbnail"
                /> */}

                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          padding: "5px 5px 5px 12px",
                          backgroundColor: "rgba(0,0,0,0.7)",
                          borderRadius: ".28571429rem 0 0 0",
                          color: "white"
                        }}
                      >
                        {album.name}
                      </div>
                    </Segment>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default GalleryList;
