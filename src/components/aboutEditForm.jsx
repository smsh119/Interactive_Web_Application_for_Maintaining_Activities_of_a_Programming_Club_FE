import React from "react";
import Form from "./common/form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { getInfo, saveInfo } from "../services/aboutService";

class AboutEditFormC extends Form {
  state = {
    data: {
      president: "",
      vicePresident1: "",
      vicePresident2: "",
      treasurer: "",
      generalSecretary: "",
      assistantGeneralSecretary: "",
      officeSecretary: "",
      assistantOfficeSecretary: "",
      financeSecretary: "",
      assistantFinanceSecretary: "",
      publicationSecretary: "",
      assistantPublicationSecretary: "",
      socialWelfareSecretary: "",
      assistantSocialWelfareSecretary: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.optional(),
    president: Joi.string().required().label("President"),
    vicePresident1: Joi.string().required().label("Vice President-1"),
    vicePresident2: Joi.string().required().label("Vice President-2"),
    treasurer: Joi.string().required().label("Treasurer"),
    generalSecretary: Joi.string().required().label("General Secretary"),
    assistantGeneralSecretary: Joi.string()
      .required()
      .label("Assistant General Secretary"),
    officeSecretary: Joi.string().required().label("Office Secretary"),
    assistantOfficeSecretary: Joi.string()
      .required()
      .label("Assistant Office Secretary"),
    financeSecretary: Joi.string().required().label("Finance Secretary"),
    assistantFinanceSecretary: Joi.string()
      .required()
      .label("Assistant Finance Secretary"),
    publicationSecretary: Joi.string()
      .required()
      .label("Publication Secretary"),
    assistantPublicationSecretary: Joi.string()
      .required()
      .label("Assistant Publication Secretary"),
    socialWelfareSecretary: Joi.string()
      .required()
      .label("Social Welfare Secretary"),
    assistantSocialWelfareSecretary: Joi.string()
      .required()
      .label("Assistant Social Welfare Secretary"),
  };

  async populateInfo() {
    try {
      const { data } = await getInfo();
      if (data.length === 0) return;
      const x = this.mapToViewModel(data[data.length - 1]);
      // console.log(x);
      this.setState({ data: x });
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
      president: response.committee.president,
      vicePresident1: response.committee.vicePresident1,
      vicePresident2: response.committee.vicePresident2,
      treasurer: response.committee.treasurer,
      generalSecretary: response.studentCommittee.generalSecretary,
      assistantGeneralSecretary:
        response.studentCommittee.assistantGeneralSecretary,
      officeSecretary: response.studentCommittee.officeSecretary,
      assistantOfficeSecretary:
        response.studentCommittee.assistantOfficeSecretary,
      financeSecretary: response.studentCommittee.financeSecretary,
      assistantFinanceSecretary:
        response.studentCommittee.assistantFinanceSecretary,
      publicationSecretary: response.studentCommittee.publicationSecretary,
      assistantPublicationSecretary:
        response.studentCommittee.assistantPublicationSecretary,
      socialWelfareSecretary: response.studentCommittee.socialWelfareSecretary,
      assistantSocialWelfareSecretary:
        response.studentCommittee.assistantSocialWelfareSecretary,
    };
    // console.log(obj);
    return obj;
  }

  mapToRequestModel(data) {
    const obj = {
      committee: {
        president: data.president,
        vicePresident1: data.vicePresident1,
        vicePresident2: data.vicePresident2,
        treasurer: data.treasurer,
      },
      studentCommittee: {
        generalSecretary: data.generalSecretary,
        assistantGeneralSecretary: data.assistantGeneralSecretary,
        officeSecretary: data.officeSecretary,
        assistantOfficeSecretary: data.assistantOfficeSecretary,
        financeSecretary: data.financeSecretary,
        assistantFinanceSecretary: data.assistantFinanceSecretary,
        publicationSecretary: data.publicationSecretary,
        assistantPublicationSecretary: data.assistantPublicationSecretary,
        socialWelfareSecretary: data.socialWelfareSecretary,
        assistantSocialWelfareSecretary: data.assistantSocialWelfareSecretary,
      },
    };

    // if (data._id) obj._id = data._id;
    return obj;
  }

  doSubmit = async () => {
    const { data } = this.state;
    const obj = this.mapToRequestModel(data);
    // console.log(obj);
    try {
      await saveInfo(obj);
      const navigate = this.props.navigate;
      navigate("/about");
    } catch (error) {
      toast.error("Error occured!");
      console.log(error.response.data);
    }
  };

  render() {
    return (
      <div className="mb-5">
        <h1>Update Profile</h1>
        <form onSubmit={this.handleSubmit}>
          <h2>Committee:</h2>
          {this.renderInput("president", "President")}
          {this.renderInput("vicePresident1", "Vice President-1")}
          {this.renderInput("vicePresident2", "Vice President-2")}
          {this.renderInput("treasurer", "Treasurer")}
          <h2>Student Committee:</h2>
          {this.renderInput("generalSecretary", "General Secretary")}
          {this.renderInput(
            "assistantGeneralSecretary",
            "Assistant General Secretary"
          )}
          {this.renderInput("officeSecretary", "Office Secretary")}
          {this.renderInput(
            "assistantOfficeSecretary",
            "Assistant Office Secretary"
          )}
          {this.renderInput("financeSecretary", "Finance Secretary")}
          {this.renderInput(
            "assistantFinanceSecretary",
            "Assistant Finance Secretary"
          )}
          {this.renderInput("publicationSecretary", "Publication Secretary")}
          {this.renderInput(
            "assistantPublicationSecretary",
            "Assistant Publication Secretary"
          )}
          {this.renderInput(
            "socialWelfareSecretary",
            "Social Welfare Secretary"
          )}
          {this.renderInput(
            "assistantSocialWelfareSecretary",
            "Assistant Social Welfare Secretary"
          )}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export function AboutEditForm(props) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <AboutEditFormC
      params={params}
      navigate={navigate}
      location={location}
    ></AboutEditFormC>
  );
}

export default AboutEditForm;
