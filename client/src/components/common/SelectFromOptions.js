import React from "react";

const SelectFromOptions = (props) => {
  const optionsJSX = [];
  for (let option of props.options) {
    optionsJSX.push(
      <div
        key={option.id}
        className={`option ${
          props.selectedOption === option.id ? "selected" : ""
				}`}
				onClick={() => props.selectOption(option.id)}
      >
				{option.name}
			</div>
    );
  }

  return (
    <div id="selectFromOptions">
			{optionsJSX}
    </div>
  );
};

export default SelectFromOptions;
