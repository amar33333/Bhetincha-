import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class AboutUsEditor extends Component {
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

  render() {
    return (
      <ReactQuill
        readOnly={this.props.readOnly}
        modules={this.modules}
        formats={this.formats}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

export default AboutUsEditor;
