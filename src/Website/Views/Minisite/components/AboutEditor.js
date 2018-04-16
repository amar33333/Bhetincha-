import React, { Component } from "react";
import { Button } from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class AboutEditor extends Component {
  static getDerivedStateFromProps(nextProps) {
    return {
      text: nextProps.initialValue ? nextProps.initialValue : ""
    };
  }
  state = { text: "" };

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

  handleChange = value => this.setState({ text: value });

  render() {
    return (
      <div>
        <p>
          <strong>Preview:</strong>
        </p>
        <div
          className="quill ql-editor"
          dangerouslySetInnerHTML={{
            __html: this.state.text
          }}
        />
        <ReactQuill
          modules={this.modules}
          formats={this.formats}
          value={this.state.text}
          onChange={this.handleChange}
        />
        <Button onClick={() => this.props.onAboutUsSave(this.state.text)}>
          Save
        </Button>
      </div>
    );
  }
}

export default AboutEditor;
