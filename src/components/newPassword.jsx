import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import auth from "../services/authService";
import { useParams, useNavigate } from "react-router-dom";

class NewPasswordC extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const params = this.props.params;
      const data = { ...this.state.data, Id: params.id };
      const response = await userService.changePassword(data);
      alert("Password changed successfully.");
      window.location = "/signIn";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
      // console.log(ex);
    }
  };

  render() {
    const navigate = this.props.navigate;
    if (auth.getCurrentUser()) return setTimeout(() => navigate("/"));
    return (
      <div className="signInUpForm">
        <h1>New Password</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", " ", "email", "Email")}
          {this.renderInput("password", " ", "password", "New Password")}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export function NewPassword(props) {
  const params = useParams();
  const navigate = useNavigate();
  return <NewPasswordC params={params} navigate={navigate}></NewPasswordC>;
}

export default NewPassword;
