import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { Card } from "semantic-ui-react";
// import moment from "moment";
// import CircularProgressbar from "react-circular-progressbar";

import "react-quill/dist/quill.snow.css";
import "react-circular-progressbar/dist/styles.css";
import "../../minisite.css";

import { onEditAboutUsClicked } from "../../actions";

class AboutUs extends Component {
  state = { AsyncEditor: null };

  onEditClicked = () => {
    this.renderEditor();
    this.props.onEditAboutUsClicked();
  };

  renderAboutEdit = () => (
    <span className="minisite_about__edit__icon">
      <i
        onClick={this.onEditClicked}
        aria-hidden="true"
        className="fa fa-pencil"
      />
    </span>
  );

  renderEditor = () => {
    import("./AboutUsEdit").then(module =>
      this.setState({ AsyncEditor: module.default })
    );
  };

  render() {
    console.log("About props: ", this.props);
    const AsyncEditor = this.state.AsyncEditor;
    return (
      <div id="about-us">
        <Container fluid className="mb-3">
          <Row>
            <Col xs="12" md="12" className="minisite_heading__text_wrapper">
              <h2 className="minisite_heading__text">
                <strong>About us</strong>
              </h2>
              {this.props.mainEdit && this.renderAboutEdit()}
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="9">
              {this.props.mainEdit && this.props.aboutUsEdit ? (
                AsyncEditor ? (
                  <AsyncEditor initialValue={this.props.data} />
                ) : (
                  <div>Loading</div>
                )
              ) : (
                <div>
                  {this.props.data.tagline && (
                    <div className="text-center">
                      <h2>&#8220;{this.props.data.tagline}&#8221;</h2>
                    </div>
                  )}

                  <div
                    className="quill ql-editor"
                    dangerouslySetInnerHTML={{
                      __html: this.props.data.aboutUs
                    }}
                  />
                </div>
              )}
            </Col>
            <Col xs="12" md="3">
              <Row className="mb-3">
                <Col xs="12">
                  <Card>
                    <Card.Content header="Information" />
                    <Card.Content>
                      <strong>Established Year : </strong>
                      {this.props.data.establishedYear === "" ||
                      !this.props.data.establishedYear ? (
                        <span> Not Provided</span>
                      ) : (
                        this.props.data.establishedYear
                      )}
                    </Card.Content>
                    <Card.Content>
                      <strong>Company Type : </strong>
                      {!this.props.data.companyType ? (
                        <span> Not Provided</span>
                      ) : (
                        this.props.data.companyType.name
                      )}
                    </Card.Content>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <Card>
                    <Card.Content header="Working Hour" />
                    {this.props.workingHour.map((day, index) => {
                      let start = new Date(day.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                      });
                      let end = new Date(day.end).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                      });

                      let today = new Date();
                      return (
                        <Card.Content>
                          <strong>{day.day}: </strong>{" "}
                          {!day.holiday ? `${start} - ${end}` : "Holiday"}{" "}
                          {(() => {
                            if (index === today.getDay()) {
                              if (
                                !day.holiday &&
                                today.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true
                                }) >= start &&
                                today.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true
                                }) <= end
                              ) {
                                return (
                                  <span style={{ color: "blue" }}>Open</span>
                                );
                              } else {
                                return (
                                  <span style={{ color: "red" }}>Closed</span>
                                );
                              }
                            }
                          })()}
                        </Card.Content>
                      );
                    })}
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  ({
    MinisiteContainer: {
      crud: { about, workingHour },
      edit
    }
  }) => ({
    data: {
      tagline: about.tagline || "",
      aboutUs: about.aboutUs || "",
      establishedYear: about.establishedYear || "",
      companyType: about.companyType
    },
    aboutUsEdit: edit.aboutUs,
    mainEdit: edit.main,
    workingHour
  }),
  { onEditAboutUsClicked }
)(AboutUs);
