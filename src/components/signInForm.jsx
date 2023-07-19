import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { useParams, useNavigate, useLocation } from "react-router-dom";

class SignInFormC extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);

      const location = this.props.location;

      if (location.state) {
        const prevUrl = location.state.prevUrl;
        // console.log(prevUrl);
        window.location = prevUrl;
      } else window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const navigate = this.props.navigate;
    if (auth.getCurrentUser()) return setTimeout(() => navigate("/"));
    return (
      <div className="signInUpForm">
        <h1>Sign In</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", " ", "text", "Email")}
          {this.renderInput("password", " ", "password", "Password")}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export function SignInForm(props) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <SignInFormC
      params={params}
      navigate={navigate}
      location={location}
    ></SignInFormC>
  );
}

export default SignInForm;
