import React, { Component } from "react";
import { connect } from "react-redux";
import LaddaButton, { S, EXPAND_RIGHT } from "react-ladda";
import AboutUsEditor from "./AboutUsEditor";

import { onBusinessUpdate } from "../actions";

class AboutUsEdit extends Component {
  static getDerivedStateFromProps = ({ initialValue }) => ({
    tagline: initialValue.tagline,
    aboutUs: initialValue.aboutUs,
    establishedYear: initialValue.establishedYear
  });

  state = { aboutUs: "" };

  handleChange = value => this.setState({ aboutUs: value });

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  render() {
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
          onClick={() =>
            this.props.onBusinessUpdate({
              body: {
                about: {
                  tagline: this.state.tagline,
                  aboutUs: this.state.aboutUs,
                  establishedYear: this.state.establishedYear
                  // companyType: this.state.companyType
                }
              }
            })
          }
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
