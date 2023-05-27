import React, { useRef, useState } from "react";
import http from "../services/httpService";

export function TestCC() {
  const handleClick = async () => {
    window.open("//google.com");
  };

  return (
    <div>
      <h1>test</h1>
      <button className="btn btn-primary" onClick={handleClick}>
        a button
      </button>
    </div>
  );
}

export default TestCC;

//     .get(`https://codeforces.com/api/user.info?${input.value}`)
//     .then((res) => {
//       if (res.status !== "OK") errors[input.name] = "CF handle not valid !";
//     });
