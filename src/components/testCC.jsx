import React, { Component, useRef, useState } from "react";

import http from "../services/httpService";
import UserSelector from "./userSelector";
import Form from "./common/form";
import JoditEditor from "jodit-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./common/loading";

class Test extends Component {
  state = {
    text: "",
  };
  render() {
    return (
      <>
        <div>
          <Loading />
        </div>
      </>
    );
  }
}

export function TestCC(props) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const editor = useRef(null);
  return (
    <Test
      {...props}
      params={params}
      navigate={navigate}
      location={location}
      editor={editor}
    ></Test>
  );
}

export default TestCC;
