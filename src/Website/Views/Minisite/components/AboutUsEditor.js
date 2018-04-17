import React, { Component } from "react";
import { connect } from "react-redux";
import LaddaButton, { S, EXPAND_RIGHT } from "react-ladda";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { handleAboutUsSave } from "../actions";

class AboutUsEditor extends Component {
  static getDerivedStateFromProps = ({ initialValue }) => ({
    tagline: initialValue.tagline,
    aboutUs: initialValue.aboutUs,
    establishedYear: initialValue.establishedYear
  });
  state = { aboutUs: "" };

  modules = {
    toolbar: [
      [{ header: [3, 4, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { align: [] },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link"],
      ["clean"]
    ]
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "align",
    "indent",
    "link"
  ];

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
        {/* <div>
          Company Type{" "}
          <input
            onChange={this.onChange.bind(this, "companyType")}
            value={this.state.companyType}
          />
        </div> */}
        <ReactQuill
          readOnly={this.props.loading}
          modules={this.modules}
          formats={this.formats}
          value={this.state.aboutUs}
          onChange={this.handleChange}
        />
        <LaddaButton
          loading={this.props.loading}
          data-size={S}
          data-style={EXPAND_RIGHT}
          onClick={() =>
            this.props.handleAboutUsSave({
              access_token: this.props.access_token,
              id: this.props.id,
              username: this.props.username,
              data: {
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
  ({
    auth,
    MinisiteContainer: {
      crud: { id, username },
      edit: { aboutUsLoading }
    }
  }) => ({
    loading: aboutUsLoading,
    id,
    username,
    access_token: auth.cookies.token_data.access_token
  }),
  { handleAboutUsSave }
)(AboutUsEditor);
