import React from "react";

const Input = ({ name, label, error, required, ...rest }) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name}>
          {label}
          {required ? <span style={{ color: "red" }}>*</span> : ""}
        </label>
      )}
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger errdiv">{error}</div>}
    </div>
  );
};

export default Input;
