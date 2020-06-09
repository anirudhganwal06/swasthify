import React, { useState } from "react";

const SelectFromOptions = (props) => {
  const [showInfo, setShowInfo] = useState(false);
  const [info, setInfo] = useState("");

  const optionsJSX = [];

  props.options.forEach((option, i) => {
    optionsJSX.push(
      <div className="option" key={option.id}>
        <div
          key={option.id}
          className={`option-btn ${
            props.selectedOption === option.id ? "selected" : ""
          } ${option.disabled ? "disabled" : ""}`}
          onClick={
            option.disabled ? () => {} : () => props.selectOption(option.id)
          }
        >
          {option.name + " "}
        </div>
        <div
          className="option-info"
          onClick={() => {
            setInfo(option.info);
            setShowInfo(option.info === info ? !showInfo : true);
          }}
        >
          &#9432;
        </div>
      </div>
    );
  });
  
  return (
    <div id="selectFromOptions">
      {optionsJSX}
      {showInfo ? (
        <div className="option-info-container">
          {info}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SelectFromOptions;
