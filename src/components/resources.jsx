import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Resources(props) {
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
