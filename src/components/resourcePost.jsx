import React, { useEffect, useState } from "react";
import { getPost } from "../services/resourcesService";
import { useParams } from "react-router-dom";
import Loading from "./common/loading";

function ResourcePost(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const params = useParams();

  const postId = params.id;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getPost(postId);
        setData(data);
        setLoading(false);
      } catch (e) {
        console.log(e.response);
      }
    }
    fetchData();
  }, []);
  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="mb-4">{data.heading}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.text }}></div>
    </div>
  );
}

export default ResourcePost;
