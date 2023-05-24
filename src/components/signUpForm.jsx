import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import auth from "../services/authService";
import { useParams, useNavigate } from "react-router-dom";

class SignUpFormC extends Form {
  state = {
    data: { sid: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    sid: Joi.string().required().min(10).max(10).label("Student ID"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const navigate = this.props.navigate;
    if (auth.getCurrentUser()) return setTimeout(() => navigate("/"));
    return (
      <div className="signUpForm">
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("sid", null, "text", "StudentID")}
          {this.renderInput("email", null, "email", "Email")}
          {this.renderInput("password", null, "password", "Password")}

          {this.renderButton("Sign Up")}
        </form>
      </div>
    );
  }
}

export function SignUpForm(props) {
  const params = useParams();
  const navigate = useNavigate();
  return <SignUpFormC params={params} navigate={navigate}></SignUpFormC>;
}

export default SignUpForm;
