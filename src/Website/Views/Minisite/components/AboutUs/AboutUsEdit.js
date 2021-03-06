import React, { Component } from "react";
import { connect } from "react-redux";
import LaddaButton, { S, EXPAND_RIGHT } from "react-ladda";
import AboutUsEditor from "./AboutUsEditor";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Input,
  FormGroup,
  Label
} from "reactstrap";

import moment from "moment";

import { onBusinessUpdate } from "../../actions";

class AboutUsEdit extends Component {
  static getDerivedStateFromProps = ({ initialValue }, prevState) => {
    console.log("getderivedstate: ", prevState);
    return {
      tagline: initialValue.tagline,
      aboutUs: initialValue.aboutUs,
      establishedYear: initialValue.establishedYear
    };
  };

  state = { aboutUs: "", establishedYear: "", tagline: "" };

  componentDidMount() {
    if (this.props.initialValue) this.updateData(this.props.initialValue);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.updateData(this.props.initialValue);
    }
  }

  updateData = initialValue => {
    this.setState({
      tagline: initialValue.tagline,
      aboutUs: initialValue.aboutUs,
      establishedYear: initialValue.establishedYear
    });
  };

  handleChange = value => this.setState({ aboutUs: value });

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  onChangeEstablishedYear = year => {
    console.log("Year: ", year);
    const establishedYear = moment.utc(year).format("YYYY");
    console.log("Year after moment: ", establishedYear);
    this.setState(
      {
        establishedYear: establishedYear
      },
      () => {
        console.log("estab state: ", this.state);
      }
    );
  };
  onSaveChanges = () => {
    const { tagline, aboutUs, establishedYear } = this.props.initialValue;
    const about = {};
    if (this.state.tagline !== tagline) about.tagline = this.state.tagline;
    if (this.state.aboutUs !== aboutUs) about.aboutUs = this.state.aboutUs;
    if (this.state.establishedYear !== establishedYear)
      about.establishedYear = this.state.establishedYear;

    this.props.onBusinessUpdate({ body: { about } });
  };

  render() {
    let yesterday = Datetime.moment().subtract(1, "day");

    let validEstablishedYear = function(current) {
      return current.isBefore(yesterday);
    };
    return (
      <div>
        <Container>
          <Card>
            <CardHeader>
              <strong>Edit About Us</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label>Tagline</Label>
                    <Input
                      disabled={this.props.loading}
                      onChange={this.onChange.bind(this, "tagline")}
                      value={this.state.tagline}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label> Established Year </Label>
                    <Datetime
                      timeFormat={false}
                      isValidDate={validEstablishedYear}
                      dateFormat="YYYY"
                      value={this.state.establishedYear}
                      defaultValue={moment.utc().format("YYYY")}
                      onChange={this.onChangeEstablishedYear}
                      viewMode={"years"}
                      utc={true}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <AboutUsEditor
                    readOnly={this.props.loading}
                    value={this.state.aboutUs}
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <LaddaButton
                      loading={this.props.loading}
                      data-size={S}
                      data-style={EXPAND_RIGHT}
                      onClick={this.onSaveChanges}
                    >
                      Save
                    </LaddaButton>
                  </FormGroup>
                </Col>
              </Row>
              <p className="text-center">
                <strong>About us preview:</strong>
              </p>
              <div
                className="quill ql-editor"
                dangerouslySetInnerHTML={{
                  __html: this.state.aboutUs
                }}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

export default connect(
  ({
    MinisiteContainer: {
      edit: { aboutUsLoading }
    }
  }) => ({
    loading: aboutUsLoading
  }),
  { onBusinessUpdate }
)(AboutUsEdit);
