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
  onChange,
  required
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        className={classnames("form-control", { "is-invalid": error })}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={!!required}
      />
      <small className="form-text text-muted">{help}</small>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default InputGroup;
