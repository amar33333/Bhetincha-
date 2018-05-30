import React from "react";
import "./chip.css";

export default ({ title, subtitle, onClose, uri }) => (
  <div className="chip">
    <img
      src={
        uri || "https://facebook.github.io/react-native/docs/assets/favicon.png"
      }
      alt="business"
      width="96"
      height="96"
    />
    <div className="textstuff">
      <strong>{title}</strong>
      <br />
      {subtitle || "subtitle"}
    </div>
    <div className="closebtn" onClick={() => onClose()}>
      &times;
    </div>
  </div>
);
