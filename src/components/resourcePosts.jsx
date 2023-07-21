import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../services/resourcesService";

function ResourcePosts(props) {
  const isAdmin = getCurrentUser() ? getCurrentUser().isAdmin : false;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getPosts();
        data.reverse();
        setData(data);
        setLoading(false);
      } catch (e) {
        console.log(e.response);
      }
    }
    fetchData();
  }, []);

  const handleAddPost = () => {
    navigate("/resources/newPost");
  };

  const handleShowPost = (id) => {
    navigate(`/resources/posts/${id}`);
  };

  if (loading) return null;
  return (
    <div>
      {isAdmin && (
        <button className="btn btn-lg custom-btn mt-2" onClick={handleAddPost}>
          Add Post
        </button>
      )}
      {data.map((post, index) => {
        return (
          <div key={index} className="postDiv">
            <div
              className="mb-2"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h2>{post.heading}</h2>
              <button
                className="btn btn-sm custom-btn"
                onClick={() => handleShowPost(post._id)}
              >
                View Full Post
              </button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.text }}></div>
          </div>
        );
      })}
    </div>
  );
}

export default ResourcePosts;
