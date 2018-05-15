import React, { Component } from "react";
import { connect } from "react-redux";
import LaddaButton, { S, EXPAND_RIGHT } from "react-ladda";
import AboutUsEditor from "./AboutUsEditor";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import moment from "moment";

import { onBusinessUpdate } from "../../actions";

class AboutUsEdit extends Component {
  static getDerivedStateFromProps = ({ initialValue }) => ({
    tagline: initialValue.tagline,
    aboutUs: initialValue.aboutUs,
    establishedYear: initialValue.establishedYear
  });

  state = { aboutUs: "", establishedYear: "", tagline: "" };

  handleChange = value => this.setState({ aboutUs: value });

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  onChangeEstablishedYear = year => {
    console.log("Year: ", year);
    console.log("Year after moment: ", moment.utc(year).format("YYYY"));
    this.setState({
      establishedYear: moment.utc(year).format("YYYY")
    });
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
        <div>
          Tagline{" "}
          <input
            disabled={this.props.loading}
            onChange={this.onChange.bind(this, "tagline")}
            value={this.state.tagline}
          />
        </div>
        <div>
          Established Year{" "}
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
          <input
            disabled={this.props.loading}
            onChange={this.onChange.bind(this, "establishedYear")}
            value={this.state.establishedYear}
          />
        </div>
        <AboutUsEditor
          readOnly={this.props.loading}
          value={this.state.aboutUs}
          onChange={this.handleChange}
        />
        <LaddaButton
          loading={this.props.loading}
          data-size={S}
          data-style={EXPAND_RIGHT}
          onClick={this.onSaveChanges}
        >
          Save
        </LaddaButton>
        <p>
          <strong>Preview:</strong>
        </p>
        <div
          className="quill ql-editor"
          dangerouslySetInnerHTML={{
            __html: this.state.aboutUs
          }}
        />
      </div>
    );
  }
}

export default connect(
  ({ MinisiteContainer: { edit: { aboutUsLoading } } }) => ({
    loading: aboutUsLoading
  }),
  { onBusinessUpdate }
)(AboutUsEdit);
