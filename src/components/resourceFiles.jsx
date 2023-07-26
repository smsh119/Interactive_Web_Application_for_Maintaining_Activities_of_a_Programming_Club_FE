import React, { useEffect, useState } from "react";
import ResourceFilesForm from "./resourceFilesForm";
import { getCurrentUser } from "../services/authService";
import { deleteFile, getFiles } from "../services/resourcesService";
import getFileUrl from "../services/fileServices";
import Loading from "./common/loading";
import { toast } from "react-toastify";

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
  const handleDeleteFile = async (file) => {
    let files = [...data];
    const indx = files.indexOf(file);
    files = [...files.slice(0, indx), ...files.slice(indx + 1)];
    setData(files);
    try {
      await deleteFile(file._id);
      toast("Deleted Successfully!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      window.location.reload();
    }
  };

  if (loading) return <Loading />;
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h2>{file.heading}</h2>
              </div>
              <div>
                <button
                  className="btn btn-md custom-btn mb-1"
                  style={{ display: "block", width: "100%" }}
                  onClick={() => (window.location = getFileUrl(file.path))}
                >
                  Download
                </button>
                {isAdmin && (
                  <button
                    className="btn btn-md btn-danger"
                    style={{
                      display: "block",
                      width: "100%",
                    }}
                    onClick={() => handleDeleteFile(file)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ResourceFiles;
