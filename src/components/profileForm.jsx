import React from "react";
import Form from "./common/form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Joi from "joi-browser";
import auth from "../services/authService";
import { getProfile, getUser, saveProfile } from "../services/profileService";
import { toast } from "react-toastify";

class ProfileFormC extends Form {
  state = {
    data: {
      name: "",
      bio: "",
      currentStatus: "",
      phone: "",
      email: "",
      fbLink: "",
      linkedinLink: "",
      githubLink: "",
      stopstalkLink: "",
      codeforcesLink: "",
      leetcodeLink: "",
      codeforces: "",
      vjudge: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.optional(),
    name: Joi.string().required().min(3).label("Name"),
    bio: Joi.string().required().min(20).label("Bio"),
    currentStatus: Joi.string().required().label("Current Status"),
    phone: Joi.number()
      .min(1000000000)
      .max(1999999999)
      .required()
      .label("Phone Number"),
    email: Joi.string().email().required().label("Email"),
    fbLink: Joi.string().label("Facebook Link"),
    linkedinLink: Joi.string().label("LinkedIn Link"),
    githubLink: Joi.string().label("Github Link"),
    stopstalkLink: Joi.string().label("Stopstalk Link"),
    codeforcesLink: Joi.string().label("Codeforces Link"),
    leetcodeLink: Joi.string().label("Leetcode Link"),
    codeforces: Joi.string().label("Codeforces Handle"),
    vjudge: Joi.string().label("VJudge Handle"),
  };

  async populateInfo() {
    try {
      const { data: user } = await getUser();
      // console.log(user);
      if (!user.isUpdated) return;
      const { data: response } = await getProfile(user.profileId);
      //   console.log(response);
      this.setState({ data: this.mapToViewModel(response) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        const navigate = this.props.navigate;
        return setTimeout(() => navigate("/not-found"));
      }
    }
  }

  async componentDidMount() {
    await this.populateInfo();
  }

  mapToViewModel(response) {
    const obj = {
      _id: response._id,
      name: response.name,
      bio: response.bio,
      currentStatus: response.currentStatus,
      phone: response.contacts.phone,
      email: response.contacts.email,
      fbLink: response.contacts.fbLink,
      linkedinLink: response.contacts.linkedinLink,
      githubLink: response.onlineJudgeLink.githubLink,
      stopstalkLink: response.onlineJudgeLink.stopstalkLink,
      codeforcesLink: response.onlineJudgeLink.codeforcesLink,
      leetcodeLink: response.onlineJudgeLink.leetcodeLink,
      codeforces: response.onlineJudgeHandle.codeforces,
      vjudge: response.onlineJudgeHandle.vjudge,
    };
    // console.log(obj);
    return obj;
  }

  mapToRequestModel(data) {
    const obj = {
      name: data.name,
      bio: data.bio,
      currentStatus: data.currentStatus,
      contacts: {
        phone: data.phone,
        email: data.email,
        fbLink: data.fbLink,
        linkedinLink: data.linkedinLink,
      },
      onlineJudgeLink: {
        githubLink: data.githubLink,
        stopstalkLink: data.stopstalkLink,
        codeforcesLink: data.codeforcesLink,
        leetcodeLink: data.leetcodeLink,
      },
      onlineJudgeHandle: {
        codeforces: data.codeforces,
        vjudge: data.vjudge,
      },
    };
    if (data._id) obj._id = data._id;

    return obj;
  }

  doSubmit = async () => {
    // console.log(this.state.data);
    const { data } = this.state;
    const obj = this.mapToRequestModel(data);

    // console.log(obj);
    try {
      await saveProfile(obj);
      const navigate = this.props.navigate;
      // setTimeout(() => {
      navigate("/profiles/" + auth.getCurrentUser().profileId);
      // }, 2000);
    } catch (error) {
      toast.error("Codeforces handle is invalid!");
      console.log(error.response.data);
    }
  };

  render() {
    return (
      <div className="mb-5">
        <h1>Update Profile</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("bio", "Bio")}
          {this.renderInput("currentStatus", "Current Status")}
          {this.renderInput("phone", "Phone", "number")}
          {this.renderInput("email", "Email")}
          {this.renderInput("fbLink", "Facebook Link")}
          {this.renderInput("linkedinLink", "LinkedIn Link")}
          {this.renderInput("githubLink", "Github Link")}
          {this.renderInput("stopstalkLink", "Stopstalks Link")}
          {this.renderInput("codeforcesLink", "Codeforces Link")}
          {this.renderInput("leetcodeLink", "Leetcode Link")}
          {this.renderInput("codeforces", "Codeforces Handle")}
          {this.renderInput("vjudge", "VJudge Handle")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export function ProfileForm(props) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <ProfileFormC
      params={params}
      navigate={navigate}
      location={location}
    ></ProfileFormC>
  );
}

export default ProfileForm;
