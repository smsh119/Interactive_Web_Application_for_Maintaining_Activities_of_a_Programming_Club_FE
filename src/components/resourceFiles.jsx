import React from "react";

function ResourceFiles(props) {
  return (
    <div>
      <button className="btn btn-lg custom-btn mt-2">Add File</button>
      <div className="fileDiv">
        <div className="row">
          <div className="col-md-10">
            <h2>File 1</h2>
          </div>
          <div className="col-md">
            <button
              className="btn btn-md custom-btn"
              style={{ float: "right" }}
            >
              View
            </button>
          </div>
        </div>
      </div>
      <div className="fileDiv">
        <div className="row">
          <div className="col-md-10">
            <h2>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Consequuntur porro labore ipsam optio, error eveniet reprehenderit
              saepe fuga atque ipsa. Alias illo et optio assumenda explicabo
              omnis, recusandae aliquam similique!
            </h2>
          </div>
          <div className="col-md">
            <button
              className="btn btn-md custom-btn"
              style={{ float: "right" }}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceFiles;
