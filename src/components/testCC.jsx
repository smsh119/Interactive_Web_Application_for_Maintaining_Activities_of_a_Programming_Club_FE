import React, { Component, useRef, useState } from "react";
import http from "../services/httpService";
import UserSelector from "./userSelector";
import Form from "./common/form";

class TestCC extends Component {
  render() {
    function handleChange(e) {
      console.log(e);
    }
    return (
      <div>
        <UserSelector onChange={handleChange} />
      </div>
    );
  }
}

export default TestCC;

//     .get(`https://codeforces.com/api/user.info?${input.value}`)
//     .then((res) => {
//       if (res.status !== "OK") errors[input.name] = "CF handle not valid !";
//     });
