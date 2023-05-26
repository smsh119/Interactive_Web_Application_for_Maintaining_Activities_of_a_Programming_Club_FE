import React from "react";
import Form from "./common/form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Joi from "joi-browser";
import { addContest } from "../services/contestService";
import dayjs from "dayjs";
import { toast } from "react-toastify";

class ContestFormC extends Form {
  state = {
    data: {
      header: "",
      date: dayjs(new Date()).toISOString(),
      participant1: "",
      participant2: "",
      participant3: "",
      description: "",
      rank: "",
      link: "",
      img1: null,
      img2: null,
      img3: null,
      img4: null,
      isApproved: false,
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    header: Joi.string().required().min(10).label("Title"),
    date: Joi.date().required(),
    participant1: Joi.string().min(3).label("Participant Name"),
    participant2: Joi.string().min(3).label("Participant Name"),
    participant3: Joi.string().min(3).label("Participant Name"),
    description: Joi.string().required().min(10).label("Description"),
    rank: Joi.string().required().min(1),
    link: Joi.optional().label("Link"),
    img1: Joi.object().required(),
    img2: Joi.object().required(),
    img3: Joi.object().required(),
    img4: Joi.object().required(),
    isApproved: Joi.boolean().required(),
  };

  //         imgLink: Joi.array().items(Joi.string()),
  //         header : Joi.string().min(10).required(),
  //         participant: Joi.array().items(Joi.string()),
  //         description: Joi.string().min(10).required(),
  //         rank: Joi.string().min(1).required(),
  //         link: Joi.optional()

  //   mapToViewModel(data) {
  //     return
  //   }

  mapToViewModel = (data) => {
    const formData = new FormData();

    formData.append("header", data.header);
    formData.append("participant1", data.participant1);
    formData.append("participant2", data.participant2);
    formData.append("participant3", data.participant3);
    formData.append("description", data.description);
    formData.append("rank", data.rank.toString());
    formData.append("link", data.link);
    formData.append("img1", data.img1);
    formData.append("img2", data.img2);
    formData.append("img3", data.img3);
    formData.append("img4", data.img4);
    formData.append("isApproved", data.isApproved);
    formData.append("date", data.date);

    return formData;
  };

  doSubmit = async () => {
    //work remaining;
    const date = this.state.data.date;
    const ddate = dayjs(date).toISOString();
    this.setState({ date: ddate });
    const data = this.mapToViewModel(this.state.data);

    // for (var pair of data.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    try {
      await addContest(data);
      const navigate = this.props.navigate;
      toast.info("Contest post successful!");
      navigate("/contestHistory");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="mb-5">
        <h1>Add Contest</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("header", "Title")}
          {this.renderDate("date", "Contest Date", "date")}
          {this.renderInput("participant1", "Particiant 1 Name")}
          {this.renderInput("participant2", "Particiant 2 Name")}
          {this.renderInput("participant3", "Particiant 3 Name")}
          {this.renderInput("description", "Descripition")}
          {this.renderInput("rank", "Rank", "number")}
          {this.renderInput("link", "Standing Link")}
          {this.renderSelectFile("img1", "Image 1")}
          {this.renderSelectFile("img2", "Image 2")}
          {this.renderSelectFile("img3", "Image 3")}
          {this.renderSelectFile("img4", "Image 4")}
          {this.renderButton("Add")}
        </form>
      </div>
    );
  }
}

export function ContestForm(props) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <ContestFormC
      params={params}
      navigate={navigate}
      location={location}
    ></ContestFormC>
  );
}

export default ContestForm;
