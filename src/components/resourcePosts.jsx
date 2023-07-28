import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { deletePost, getPosts } from "../services/resourcesService";
import Loading from "./common/loading";
import { toast } from "react-toastify";

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
    navigate("/resources/new");
  };

  const handleShowPost = (id) => {
    navigate(`/resources/posts/${id}`);
  };

  const handleDeletePost = async (post) => {
    let posts = [...data];
    const indx = posts.indexOf(post);
    posts = [...posts.slice(0, indx), ...posts.slice(indx + 1)];
    setData(posts);
    try {
      await deletePost(post._id);
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
              <div
                style={{
                  minWidth: "110px",
                  maxWidth: "110px",
                }}
              >
                <button
                  className="btn btn-sm custom-btn mb-1"
                  style={{ display: "block", width: "100%" }}
                  onClick={() => handleShowPost(post._id)}
                >
                  View Full Post
                </button>
                {isAdmin && (
                  <button
                    className="btn btn-sm btn-danger"
                    style={{
                      display: "block",
                      width: "100%",
                    }}
                    onClick={() => handleDeletePost(post)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.text }}></div>
          </div>
        );
      })}
    </div>
  );
}

export default ResourcePosts;
