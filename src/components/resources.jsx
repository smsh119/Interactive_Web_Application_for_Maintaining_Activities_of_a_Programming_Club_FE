import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Resources(props) {
  // const [loading, setLoading] = useState(true);
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const { data } = await getPosts();
  //       // console.log(data);
  //       setData(data);
  //       console.log(data);
  //       setLoading(false);
  //     } catch (e) {
  //       console.log(e.response);
  //       //window.location = "/notFound";
  //     }
  //   }
  //   fetchData();
  // }, []);
  // if (loading) return null;
  return (
    <div className="resourcesWrap">
      <h1>Resources</h1>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <NavLink
            className=" nav-link fontLilitaOne clr2"
            to="/resources/posts"
          >
            Posts
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className=" nav-link fontLilitaOne clr2"
            to="/resources/files"
          >
            Files
          </NavLink>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

export default Resources;
