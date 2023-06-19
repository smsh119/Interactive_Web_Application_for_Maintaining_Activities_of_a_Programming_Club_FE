import React from "react";
import Form from "./common/form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Joi from "joi-browser";
import { addNotice } from "../services/noticeService";
import dayjs from "dayjs";
import { toast } from "react-toastify";

class NoticeFormC extends Form {
  state = {
    data: {
      header: "",
      date: dayjs(new Date()).toISOString(),
      programDate: dayjs(new Date()).toISOString(),
      description: "",
      link: "",
      banner: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    header: Joi.string().required().max(200).label("Title"),
    date: Joi.date().required(),
    programDate: Joi.date().required().label("Date"),
    description: Joi.string().required().min(5).label("Description"),
    link: Joi.optional().label("Link"),
    banner: Joi.optional().label("Banner"),
  };

  doSubmit = async () => {
    const d = new Date();
    const d2 = this.state.data.programDate;
    const dd = dayjs(d).toISOString();
    const dd2 = dayjs(d2).toISOString();
    this.setState({ date: dd, programDate: dd2 });

    try {
      await addNotice(this.state.data);
      const navigate = this.props.navigate;
      navigate("/notices");
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data);
    }
  };

  render() {
    return (
      <div>
        <h1>Add Notice</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("header", "Title")}
          {this.renderDate("programDate", "Date")}
          {this.renderInput("description", "Descripition")}
          {this.renderInput("link", "Link")}
          {this.renderInput("banner", "Banner")}
          {this.renderButton("Add")}
        </form>
      </div>
    );
  }
}

export function NoticeForm(props) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <NoticeFormC
      params={params}
      navigate={navigate}
      location={location}
    ></NoticeFormC>
  );
}

export default NoticeForm;
