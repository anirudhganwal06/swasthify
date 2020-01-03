import React from "react";

const InputStepper = ({ className, value, incrementHandler, decrementHandler }) => (
  <div className={"btn-group " + className}>
    <button
      className="btn themeColorHoverBtn btn-block"
      onClick={decrementHandler}
    >
      -
    </button>
    <button className="btn btn-outline-dark" disabled>{value}</button>
    <button
      className="btn themeColorHoverBtn btn-block"
      onClick={incrementHandler}
    >
      +
    </button>
  </div>
);

export default InputStepper;