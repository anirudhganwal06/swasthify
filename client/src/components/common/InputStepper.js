import React from "react";

const InputStepper = ({ className, value, incrementHandler, decrementHandler }) => (
  <div className={"btn-group " + className}>
    <button
      className="btn themeColorHoverBtn btn-block w-25"
      onClick={decrementHandler}
    >
      -
    </button>
    <span className="btn label w-50">{value}</span>
    <button
      className="btn themeColorHoverBtn btn-block w-25"
      onClick={incrementHandler}
    >
      +
    </button>
  </div>
);

export default InputStepper;