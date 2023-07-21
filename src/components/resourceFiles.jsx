import React, { useEffect, useState } from "react";
import ResourceFilesForm from "./resourceFilesForm";
import { getCurrentUser } from "../services/authService";
import { getFiles } from "../services/resourcesService";
import getFileUrl from "../services/fileServices";

function ResourceFiles(props) {
  const [showForm, setShowForm] = useState(false);
  const isAdmin = getCurrentUser() ? getCurrentUser().isAdmin : false;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getFiles();
        data.reverse();
        setData(data);
        setLoading(false);
      } catch (e) {
        console.log(e.response);
      }
    }
    fetchData();
  }, []);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  if (loading) return null;
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
      {data.map((file, index) => {
        return (
          <div key={index} className="fileDiv">
            <div className="row">
              <div className="col-md-10">
                <h2>{file.heading}</h2>
              </div>
              <div className="col-md">
                <button
                  className="btn btn-md custom-btn"
                  style={{ float: "right" }}
                  onClick={() => (window.location = getFileUrl(file.path))}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ResourceFiles;
