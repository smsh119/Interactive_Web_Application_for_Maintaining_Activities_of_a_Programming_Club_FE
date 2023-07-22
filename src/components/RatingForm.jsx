import React, { Component } from "react";
import http from "../services/httpService";
import Joi from "joi-browser";
import Input from "./common/input";
import UserSelector from "./userSelector";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import Loading from "./common/loading";

class RatingForm extends Component {
  state = {
    data: [
      {
        profileId: "",
        points: "",
        panalties: "",
      },
    ],
    date: "",
    errors: {},
    users: {},
    programmersList: [],
    options: [],
    loading: true,
  };

  schema = {
    _id: Joi.optional(),
    list: Joi.array().items(
      Joi.object({
        profileId: Joi.required(),
        points: Joi.number().required(),
        panalties: Joi.number().required(),
      })
    ),
    date: Joi.date().required(),
  };

  async componentDidMount() {
    try {
      const { data } = await http.get("/programmers/list");
      this.mapOptions(data);
      this.setState({ programmersList: data, loading: false });
    } catch (e) {
      console.log(e);
    }
  }

  doSubmit = async () => {
    const obj = {
      list: this.state.data,
      date: this.state.date,
    };
    const error = this.validate(obj);
    if (error) {
      toast.error("Fill up every input field...");
    } else {
      try {
        await http.post("/vjudge", obj);
        window.location = "/rating";
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  validate = (obj) => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(obj, this.schema, options);
    if (!error) return null;

    return error.details[0].message;
  };

  mapOptions = (data) => {
    let optns = [];
    for (let i = 0; i < data.length; i++) {
      optns.push({
        label:
          data[i].profileId.name +
          " | " +
          data[i].sid +
          " | " +
          data[i].profileId.onlineJudgeHandle.vjudge,
        value: data[i].profileId._id,
      });
    }
    this.setState({ options: optns });
  };

  handleChange = ({ currentTarget: input }, index = 0) => {
    if (input.name === "date") {
      const date = dayjs(input.value).toISOString();
      this.setState({ date });
    } else {
      const data = [...this.state.data];
      const obj = { ...data[index] };
      obj[input.name] = input.value ? parseInt(input.value) : "";
      data[index] = obj;
      this.setState({ data });
    }
  };

  handleChangeForUserSelector = (e, name, index) => {
    const data = [...this.state.data];
    const obj = { ...data[index] };
    obj[name] = e.profileId;
    data[index] = obj;
    this.setState({ data });
  };

  handleAddField = () => {
    const data = [...this.state.data];
    data.push({
      profileId: "",
      points: "",
      panalties: "",
    });
    this.setState({ data });
  };

  handleDeleteField = (index) => {
    const data = [...this.state.data];
    data.pop();
    this.setState({ data });
  };

  renderDateField = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <label htmlFor="date">Contest Date and Time :</label>
        <input
          name="date"
          type="datetime-local"
          onChange={this.handleChange}
          style={{
            width: "210px",
            borderRadius: "10px",
            marginLeft: "10px",
            padding: "5px 10px",
            color: "gray",
            borderColor: "gray",
          }}
        />
      </div>
    );
  };

  render() {
    if (this.state.loading) return <Loading />;
    const { data: fields } = this.state;
    return (
      <div>
        <h1>New Rating</h1>
        {this.renderDateField()}
        {fields.map((field, index) => {
          return (
            <div className="row" key={index}>
              <div className="col mt-1">
                <UserSelector
                  placeholder="User"
                  onChange={(e) =>
                    this.handleChangeForUserSelector(e, "profileId", index)
                  }
                  error={this.state.errors["profileId"]}
                  options={this.state.options}
                  users={this.state.programmersList}
                />
              </div>
              <div className="col">
                <Input
                  type={"number"}
                  name={"points"}
                  label={""}
                  value={field.points}
                  error={this.state.errors["points"]}
                  onChange={(e) => this.handleChange(e, index)}
                  placeholder={"Points"}
                />
              </div>
              <div className="col">
                <Input
                  type={"number"}
                  name={"panalties"}
                  label={""}
                  value={field.panalties}
                  error={this.state.errors["panalties"]}
                  onChange={(e) => this.handleChange(e, index)}
                  placeholder={"Panalties"}
                />
              </div>
            </div>
          );
        })}
        <div>
          {fields.length > 1 && (
            <button
              className="btn btn-sm btn-danger mb-2"
              onClick={this.handleDeleteField}
              style={{ float: "right" }}
            >
              Delete Field
            </button>
          )}
        </div>
        <button
          className="btn btn-sm custom-btn"
          style={{ marginRight: "4px" }}
          onClick={this.handleAddField}
        >
          Add Fields
        </button>
        <button className="btn btn-sm custom-btn" onClick={this.doSubmit}>
          Save
        </button>
      </div>
    );
  }
}

export default RatingForm;
