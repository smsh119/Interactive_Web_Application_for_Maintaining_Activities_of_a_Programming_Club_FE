import React, { Component } from "react";
import { getNotices } from "../services/noticeService";
import axios from "axios";

class TestCC extends Component {
  state = {
    notice: null,
  };

  async componentDidMount() {
    const x = await axios.get("https://asm-vidly.onrender.com/api/img/img", {
      responseType: "blob",
    });
    let imgUrl = URL.createObjectURL(x.data);
    this.setState({ notice: imgUrl });
    console.log(x);
  }

  render() {
    return (
      <>
        <img src={this.state.notice} alt="" />
      </>
    );
  }
}

export default TestCC;
