import React from "react";

const SelectFromOptions = (props) => {
  const optionsJSX = [];
  for (let option of props.options) {
    optionsJSX.push(
      <div
        key={option.id}
        className={`option ${
          props.selectedOption === option.id ? "selected" : ""
        } ${option.disabled ? "disabled" : ""}`}
        onClick={
          option.disabled ? () => {} : () => props.selectOption(option.id)
        }
      >
        {option.name + " "}
        <span title={option.info}>&#9432;</span>
      </div>
    );
  }

  return <div id="selectFromOptions">{optionsJSX}</div>;
};

export default SelectFromOptions;
