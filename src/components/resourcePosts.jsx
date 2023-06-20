import React, { useState } from "react";
import ResourcePostsForm from "./resourcePostsForm";
import { getCurrentUser } from "../services/authService";

function ResourcePosts(props) {
  const [showForm, setShowForm] = useState(false);
  const isAdmin = getCurrentUser() ? getCurrentUser().isAdmin : false;

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      {isAdmin && (
        <button className="btn btn-lg custom-btn mt-2" onClick={handleShowForm}>
          Add Post
        </button>
      )}
      {showForm && (
        <div className="resourceForm">
          <ResourcePostsForm onClose={handleShowForm} />
        </div>
      )}
      <div className="postDiv">
        <h2>post 1</h2>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Exercitationem modi ratione rem ut eveniet distinctio, ab deserunt
          accusamus quos praesentium repellat! Velit accusantium esse quae nobis
          debitis itaque eos id.
        </div>
      </div>
      <div className="postDiv">
        <h2>post 1</h2>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Exercitationem modi ratione rem ut eveniet distinctio, ab deserunt
          accusamus quos praesentium repellat! Velit accusantium esse quae nobis
          debitis itaque eos id.
        </div>
      </div>
      <div className="postDiv">
        <h2>post 1</h2>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Exercitationem modi ratione rem ut eveniet distinctio, ab deserunt
          accusamus quos praesentium repellat! Velit accusantium esse quae nobis
          debitis itaque eos id.
        </div>
      </div>
    </div>
  );
}

export default ResourcePosts;
