import React from "react";
import classnames from "classnames";

const InputGroup = ({
  id,
  label,
  type,
  name,
  placeholder,
  value,
  error,
  help,
  onChange
}) => {
  return (
    <div class="form-group">
      <label for={id}>{label}</label>
      <input
        class={classnames("form-control", { "is-invalid": error })}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <small class="form-text text-muted">{help}</small>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default InputGroup;
