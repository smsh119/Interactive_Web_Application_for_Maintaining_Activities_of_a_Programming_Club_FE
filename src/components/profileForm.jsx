import React from "react";
import Form from "./common/form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Joi from "joi-browser";
import auth from "../services/authService";
import { getProfile, getUser, saveProfile } from "../services/profileService";
import { toast } from "react-toastify";
import Loading from "./common/loading";

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
    loading: true,
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
    fbLink: Joi.optional().label("Facebook Link"),
    linkedinLink: Joi.optional().label("LinkedIn Link"),
    githubLink: Joi.optional().label("Github Link"),
    stopstalkLink: Joi.optional().label("Stopstalk Link"),
    codeforcesLink: Joi.string().label("Codeforces Link"),
    leetcodeLink: Joi.optional().label("Leetcode Link"),
    codeforces: Joi.string().label("Codeforces Handle"),
    vjudge: Joi.string().label("VJudge Handle"),
  };

  async populateInfo() {
    try {
      const { data: user } = await getUser();
      if (!user.isUpdated) {
        this.setState({ loading: false });
        return;
      }
      const { data: response } = await getProfile(user.profileId);
      this.setState({ data: this.mapToViewModel(response), loading: false });
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
      fbLink:
        response.contacts.fbLink === "not provided"
          ? ""
          : response.contacts.fbLink,
      linkedinLink:
        response.contacts.linkedinLink === "not provided"
          ? ""
          : response.contacts.linkedinLink,
      githubLink:
        response.onlineJudgeLink.githubLink === "not provided"
          ? ""
          : response.contacts.githubLink,
      stopstalkLink:
        response.onlineJudgeLink.stopstalkLink === "not provided"
          ? ""
          : response.contacts.stopstalkLink,
      codeforcesLink: response.onlineJudgeLink.codeforcesLink,
      leetcodeLink:
        response.onlineJudgeLink.leetcodeLink === "not provided"
          ? ""
          : response.contacts.leetcodeLink,
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
        fbLink: data.fbLink === "" ? "not provided" : data.fbLink,
        linkedinLink:
          data.linkedinLink === "" ? "not provided" : data.linkedinLink,
      },
      onlineJudgeLink: {
        githubLink: data.githubLink === "" ? "not provided" : data.githubLink,
        stopstalkLink:
          data.stopstalkLink === "" ? "not provided" : data.stopstalkLink,
        codeforcesLink: data.codeforcesLink,
        leetcodeLink:
          data.leetcodeLink === "" ? "not provided" : data.leetcodeLink,
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
    this.setState({ loading: true });
    const { data } = this.state;
    const obj = this.mapToRequestModel(data);
    try {
      await saveProfile(obj);
      const navigate = this.props.navigate;
      navigate("/profiles/" + auth.getCurrentUser().profileId);
    } catch (error) {
      toast.error("Codeforces handle is invalid!");
      console.log(error.response.data);
    }
  };

  render() {
    if (this.state.loading) return <Loading />;
    return (
      <div className="mb-5">
        <h1>Update Profile</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name", "text", "Required", true)}
          {this.renderInput("bio", "Bio", "text", "Required", true)}
          {this.renderInput(
            "currentStatus",
            "Current Status",
            "text",
            "Required",
            true
          )}
          {this.renderInput("phone", "Phone", "number", "Required", true)}
          {this.renderInput("email", "Email", "text", "Required", true)}
          {this.renderInput("fbLink", "Facebook Link", "text", "Optional")}
          {this.renderInput(
            "linkedinLink",
            "LinkedIn Link",
            "text",
            "Optional"
          )}
          {this.renderInput("githubLink", "Github Link", "text", "Optional")}
          {this.renderInput(
            "stopstalkLink",
            "Stopstalks Link",
            "text",
            "Optional"
          )}
          {this.renderInput(
            "codeforcesLink",
            "Codeforces Link",
            "text",
            "Required",
            true
          )}
          {this.renderInput(
            "leetcodeLink",
            "Leetcode Link",
            "text",
            "Optional"
          )}
          {this.renderInput(
            "codeforces",
            "Codeforces Handle",
            "text",
            "Required",
            true
          )}
          {this.renderInput(
            "vjudge",
            "VJudge Handle",
            "text",
            "Required",
            true
          )}
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
