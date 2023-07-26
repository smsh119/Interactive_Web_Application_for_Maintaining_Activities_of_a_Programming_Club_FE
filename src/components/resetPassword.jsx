import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import { resetPassword } from "../services/userService";

class ResetPasswordC extends Form {
  state = {
    data: { email: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const respose = await resetPassword(data);
      alert(respose.data);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
      toast.error(ex.response.data);
    }
  };

  render() {
    const navigate = this.props.navigate;
    if (auth.getCurrentUser()) return setTimeout(() => navigate("/"));
    return (
      <div className="signInUpForm">
        <h1>Reset Password</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", " ", "text", "Email")}
          {this.renderButton("Reset")}
        </form>
      </div>
    );
  }
}

export function ResetPassword(props) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <ResetPasswordC
      params={params}
      navigate={navigate}
      location={location}
    ></ResetPasswordC>
  );
}

export default ResetPassword;
