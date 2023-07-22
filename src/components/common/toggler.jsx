import React from "react";

const Toggler = (props) => {
  let selected = "#189ab4";
  if (!props.isAdmin) selected = "inherit";
  return (
    <div
      onClick={props.onClick}
      style={{
        backgroundColor: selected,
        border: "0.4em solid #05445e",
        borderRadius: "0.3em",
        width: "1.7em",
        height: "1.7em",
        margin: "auto",
        cursor: "pointer",
      }}
    ></div>
  );
};

export default Toggler;
