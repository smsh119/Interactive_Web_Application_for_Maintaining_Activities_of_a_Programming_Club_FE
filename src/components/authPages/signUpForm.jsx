import Joi from "joi-browser";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../../services/authService";
import * as userService from "../../services/userService";
import Form from "../common/form";

class SignUpFormC extends Form {
    state = {
        data: {
            sid: "",
            email: "",
            password: "",
        },
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
            alert(response.data);
            window.location = "/";
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
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("sid", " ", "text", "StudentID")}
                    {this.renderInput("email", " ", "email", "Email")}
                    {this.renderInput("password", " ", "password", "Password")}

                    {this.renderButton("Sign Up")}
                </form>
            </div>
        );
    }
}

export function SignUpForm() {
    const params = useParams();
    const navigate = useNavigate();
    return <SignUpFormC params={params} navigate={navigate}></SignUpFormC>;
}

export default SignUpForm;
