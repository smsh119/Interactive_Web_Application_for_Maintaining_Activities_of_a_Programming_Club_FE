import React from "react";

const Textarea = ({ name, label, error, rows, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        {...rest}
        name={name}
        id={name}
        className="form-control"
        rows={rows}
      />
      {error && <div className="alert alert-danger errdiv">{error}</div>}
    </div>
  );
};

export default Textarea;
