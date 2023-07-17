import React, { Component, useRef, useState } from "react";

import http from "../services/httpService";
import UserSelector from "./userSelector";
import Form from "./common/form";
import JoditEditor from "jodit-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

class Test extends Component {
  state = {
    text: "",
  };
  render() {
    const editor = this.props.editor;
    console.log(this.state.text);
    return (
      <>
        <div>
          <JoditEditor
            ref={editor}
            value={this.state.text}
            onChange={(text) => this.setState({ text })}
          />
        </div>
        <div>
          <div dangerouslySetInnerHTML={{ __html: this.state.text }} />
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
