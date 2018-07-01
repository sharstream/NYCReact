import React from "react";

// stateless button class
export const FormBtn = props => (
    <button {...props} style={{ margin: "center", marginBottom: 10 }} className="btn btn-success">
      {props.children}
      <i className="icon-search"></i>
    </button>
);