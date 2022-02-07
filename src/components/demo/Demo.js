import React from "react";

import "./Demo.css";

export const Demo = ({ title, message }) => {
  return (
    <div className="demo">
      <div className="alert">
        <h2 className="title">{title}</h2>
        <span className="message">{message}</span>
      </div>
    </div>
  );
};
