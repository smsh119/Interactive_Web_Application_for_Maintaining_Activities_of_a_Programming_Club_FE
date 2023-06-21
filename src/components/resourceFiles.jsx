import React, { useState } from "react";
import ResourceFilesForm from "./resourceFilesForm";
import { getCurrentUser } from "../services/authService";

function ResourceFiles(props) {
  const [showForm, setShowForm] = useState(false);
  const isAdmin = getCurrentUser() ? getCurrentUser().isAdmin : false;

  const handleShowForm = () => {
    setShowForm(!showForm);
  };
  return (
    <div>
      {isAdmin && (
        <button className="btn btn-lg custom-btn mt-2" onClick={handleShowForm}>
          Add File
        </button>
      )}
      {showForm && (
        <div className="resourceForm">
          <ResourceFilesForm onClose={handleShowForm} />
        </div>
      )}
      <div className="fileDiv">
        <div className="row">
          <div className="col-md-10">
            <h2>Competitive Programming 3</h2>
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
            <h2>Computer Programming | Tamim Shahriar Shubin</h2>
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
