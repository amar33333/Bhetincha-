import React from "react";
import "./chip.css";

export default ({ title, onClose }) => (
  <div className="chip">
    <img
      src="https://facebook.github.io/react-native/docs/assets/favicon.png"
      alt="business"
      width="96"
      height="96"
    />
    {title}
    <span className="closebtn" onClick={() => onClose()}>
      &times;
    </span>
  </div>
);
