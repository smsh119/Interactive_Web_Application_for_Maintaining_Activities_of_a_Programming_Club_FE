import React from "react";
import Form from "./common/form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Joi from "joi-browser";
import { addContest } from "../services/contestService";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import http from "../services/httpService";

class ContestFormC extends Form {
  state = {
    data: {
      header: "",
      date: dayjs(new Date()).toISOString(),
      participant1: "",
      participant1ProfileId: "",
      participant2: "",
      participant2ProfileId: "",
      participant3: "",
      participant3ProfileId: "",
      description: "",
      rank: "",
      link: "",
      img1: null,
      img2: null,
      img3: null,
      img4: null,
      isApproved: false,
      contestType: "",
    },
    errors: {},
    programmersList: [],
    options: [],
  };

  schema = {
    _id: Joi.string(),
    header: Joi.string().required().min(10).label("Title"),
    date: Joi.date().required(),
    participant1: Joi.string().min(3).label("Participant Name"),
    participant2: Joi.string().min(3).label("Participant Name"),
    participant3: Joi.string().min(3).label("Participant Name"),
    participant1ProfileId: Joi.string().optional(),
    participant2ProfileId: Joi.string().optional(),
    participant3ProfileId: Joi.string().optional(),
    description: Joi.string().required().min(10).label("Description"),
    rank: Joi.string().required().min(1),
    link: Joi.optional().label("Link"),
    img1: Joi.object().required(),
    img2: Joi.object().required(),
    img3: Joi.object().required(),
    img4: Joi.object().required(),
    isApproved: Joi.boolean().required(),
    contestType: Joi.string().required().label("Contest Type"),
  };

  async componentDidMount() {
    try {
      const { data } = await http.get("/programmers/list");
      this.setState({ programmersList: data });
      this.mapOptions(data);
    } catch (e) {
      console.log(e);
    }
  }

  mapOptions = (data) => {
    let optns = [];
    for (let i = 0; i < data.length; i++) {
      optns.push({
        label: data[i].profileId.name + " | " + data[i].sid,
        value: data[i].profileId._id,
      });
    }
    this.setState({ options: optns });
  };

  mapToRequestModel = (data) => {
    const formData = new FormData();
    const participant1Obj = {
      name: data.participant1,
      profileId: data.participant1ProfileId,
    };
    const participant2Obj = {
      name: data.participant2,
      profileId: data.participant2ProfileId,
    };
    const participant3Obj = {
      name: data.participant3,
      profileId: data.participant3ProfileId,
    };

    formData.append("header", data.header);
    formData.append("participant1", JSON.stringify(participant1Obj));
    formData.append("participant2", JSON.stringify(participant2Obj));
    formData.append("participant3", JSON.stringify(participant3Obj));
    formData.append("description", data.description);
    formData.append("rank", data.rank.toString());
    formData.append("link", data.link);
    formData.append("img1", data.img1);
    formData.append("img2", data.img2);
    formData.append("img3", data.img3);
    formData.append("img4", data.img4);
    formData.append("isApproved", data.isApproved);
    formData.append("date", data.date);
    formData.append("contestType", data.contestType);

    return formData;
  };

  doSubmit = async () => {
    const date = this.state.data.date;
    const ddate = dayjs(date).toISOString();
    this.setState({ date: ddate });
    const data = this.mapToRequestModel(this.state.data);
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
          {this.renderUserSelector(
            "participant1",
            "Particiant 1",
            this.state.options,
            this.state.programmersList
          )}
          {this.renderUserSelector(
            "participant2",
            "Particiant 2",
            this.state.options,
            this.state.programmersList
          )}
          {this.renderUserSelector(
            "participant3",
            "Particiant 3",
            this.state.options,
            this.state.programmersList
          )}
          {this.renderInput("description", "Descripition")}
          {this.renderInput("rank", "Rank", "number")}
          {this.renderInput("link", "Standing Link")}
          {this.renderSelect("contestType", "Contest Type", [
            { _id: "ICPC", name: "ICPC" },
            { _id: "IUPC", name: "IUPC" },
            { _id: "IDPC", name: "IDPC" },
          ])}
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
