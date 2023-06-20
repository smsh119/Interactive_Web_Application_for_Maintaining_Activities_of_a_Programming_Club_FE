import { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";
import Select from "./select";
import dayjs from "dayjs";
import http from "../../services/httpService";
import UserSelector from "../userSelector";
import Textarea from "./textarea";
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    // console.log(error);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    //console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    // if (input.name === "codeforces") {
    //   //for calling codeforces api
    //   http
    //     .get(`https://codeforces.com/api/user.info?${input.value}`)
    //     .then((res) => {
    //       if (res.status !== "OK") errors[input.name] = "CF handle not valid !";
    //     });
    // }
    const data = { ...this.state.data };
    if (input.name === "programDate")
      data[input.name] = dayjs(input.value).toISOString();
    else data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleChangeForUserSelector = (e, name) => {
    // console.log(e);
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty({ name: name, value: e.name });
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];

    const data = { ...this.state.data };
    data[name] = e.name;
    data[name + "ProfileId"] = e.profileId;
    // console.log(data);
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        className="btn btn-info btn-lg custom-btn"
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text", placeholder = "") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
        placeholder={placeholder}
      />
    );
  }

  renderTextarea(name, label, type = "text", placeholder = "", rows = 5) {
    const { data, errors } = this.state;
    return (
      <Textarea
        type={type}
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
        placeholder={placeholder}
        rows={rows}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderDate(name, label, type = "datetime-local") {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          name={name}
          type={type}
          onChange={this.handleChange}
          className="form-control"
        />
        {this.state.errors[name] && (
          <div className="alert alert-danger">{this.state.errors[name]}</div>
        )}
      </div>
    );
  }

  handleImg = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    const img = input.files[0];
    data[input.name] = img;
    this.setState({ data });
    // console.log(this.state.data);
  };

  renderSelectFile(name, label) {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          name={name}
          type="file"
          onChange={this.handleImg}
          className="form-control"
        />
      </div>
    );
  }

  renderUserSelector(name, label, options, users) {
    return (
      <div>
        <p>{label}</p>
        <UserSelector
          onChange={(e) => this.handleChangeForUserSelector(e, name)}
          error={this.state.errors[name]}
          options={options}
          users={users}
        />
      </div>
    );
  }
}

export default Form;
