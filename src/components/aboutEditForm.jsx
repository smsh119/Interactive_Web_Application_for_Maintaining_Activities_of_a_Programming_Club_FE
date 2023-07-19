import React from "react";
import Form from "./common/form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { getInfo, saveInfo } from "../services/aboutService";
import http from "../services/httpService";

class AboutEditFormC extends Form {
  state = {
    data: {
      president: "",
      presidentDesignation: "",
      vicePresident1: "",
      vicePresident1Designation: "",
      vicePresident2: "",
      vicePresident2Designation: "",
      treasurer: "",
      treasurerDesignation: "",
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
      generalSecretaryProfileId: "",
      assistantGeneralSecretaryProfileId: "",
      officeSecretaryProfileId: "",
      assistantOfficeSecretaryProfileId: "",
      financeSecretaryProfileId: "",
      assistantFinanceSecretaryProfileId: "",
      publicationSecretaryProfileId: "",
      assistantPublicationSecretaryProfileId: "",
      socialWelfareSecretaryProfileId: "",
      assistantSocialWelfareSecretaryProfileId: "",
    },
    errors: {},
    users: {},
    programmersList: [],
    options: [],
  };

  schema = {
    _id: Joi.optional(),
    president: Joi.string().required().label("Name"),
    presidentDesignation: Joi.string().required().label("Designation"),
    vicePresident1: Joi.string().required().label("Name"),
    vicePresident1Designation: Joi.string().required().label("Designation"),
    vicePresident2: Joi.string().required().label("Name"),
    vicePresident2Designation: Joi.string().required().label("Designation"),
    treasurer: Joi.string().required().label("Name"),
    treasurerDesignation: Joi.string().required().label("Designation"),
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
    generalSecretaryProfileId: Joi.optional(),
    assistantGeneralSecretaryProfileId: Joi.optional(),
    officeSecretaryProfileId: Joi.optional(),
    assistantOfficeSecretaryProfileId: Joi.optional(),
    financeSecretaryProfileId: Joi.optional(),
    assistantFinanceSecretaryProfileId: Joi.optional(),
    publicationSecretaryProfileId: Joi.optional(),
    assistantPublicationSecretaryProfileId: Joi.optional(),
    socialWelfareSecretaryProfileId: Joi.optional(),
    assistantSocialWelfareSecretaryProfileId: Joi.optional(),
  };

  async populateInfo() {
    try {
      const { data } = await getInfo();
      if (data.length === 0) return;
      const x = this.mapToViewModel(data[data.length - 1]);
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
    try {
      const { data } = await http.get("/programmers/list");
      this.setState({ programmersList: data });
      this.mapOptions(data);
    } catch (e) {
      console.log(e);
    }
  }

  mapOptions = (data) => {
    let optns = [];
    for (let i = 0; i < data.length; i++) {
      optns.push({
        label: data[i].profileId.name + " | " + data[i].sid,
        value: data[i].profileId._id,
      });
    }
    this.setState({ options: optns });
  };

  mapToViewModel(response) {
    const obj = {
      _id: response._id,
      president: response.committee.president.name,
      vicePresident1: response.committee.vicePresident1.name,
      vicePresident2: response.committee.vicePresident2.name,
      treasurer: response.committee.treasurer.name,

      presidentDesignation: response.committee.president.designation,
      vicePresident1Designation: response.committee.vicePresident1.designation,
      vicePresident2Designation: response.committee.vicePresident2.designation,
      treasurerDesignation: response.committee.treasurer.designation,

      generalSecretaryProfileId:
        response.studentCommittee.generalSecretary.profileId,
      assistantGeneralSecretaryProfileId:
        response.studentCommittee.assistantGeneralSecretary.profileId,
      officeSecretaryProfileId:
        response.studentCommittee.officeSecretary.profileId,
      assistantOfficeSecretaryProfileId:
        response.studentCommittee.assistantOfficeSecretary.profileId,
      financeSecretaryProfileId:
        response.studentCommittee.financeSecretary.profileId,
      assistantFinanceSecretaryProfileId:
        response.studentCommittee.assistantFinanceSecretary.profileId,
      publicationSecretaryProfileId:
        response.studentCommittee.publicationSecretary.profileId,
      assistantPublicationSecretaryProfileId:
        response.studentCommittee.assistantPublicationSecretary.profileId,
      socialWelfareSecretaryProfileId:
        response.studentCommittee.socialWelfareSecretary.profileId,
      assistantSocialWelfareSecretaryProfileId:
        response.studentCommittee.assistantSocialWelfareSecretary.profileId,
    };
    return obj;
  }

  mapToRequestModel(data) {
    const obj = {
      committee: {
        president: {
          name: data.president,
          designation: data.presidentDesignation,
        },
        vicePresident1: {
          name: data.vicePresident1,
          designation: data.vicePresident1Designation,
        },
        vicePresident2: {
          name: data.vicePresident2,
          designation: data.vicePresident2Designation,
        },
        treasurer: {
          name: data.treasurer,
          designation: data.treasurerDesignation,
        },
      },
      studentCommittee: {
        generalSecretary: {
          name: data.generalSecretary,
          profileId: data.generalSecretaryProfileId,
        },
        assistantGeneralSecretary: {
          name: data.assistantGeneralSecretary,
          profileId: data.assistantGeneralSecretaryProfileId,
        },
        officeSecretary: {
          name: data.officeSecretary,
          profileId: data.officeSecretaryProfileId,
        },
        assistantOfficeSecretary: {
          name: data.assistantOfficeSecretary,
          profileId: data.assistantOfficeSecretaryProfileId,
        },
        financeSecretary: {
          name: data.financeSecretary,
          profileId: data.financeSecretaryProfileId,
        },
        assistantFinanceSecretary: {
          name: data.assistantFinanceSecretary,
          profileId: data.assistantFinanceSecretaryProfileId,
        },
        publicationSecretary: {
          name: data.publicationSecretary,
          profileId: data.publicationSecretaryProfileId,
        },
        assistantPublicationSecretary: {
          name: data.assistantPublicationSecretary,
          profileId: data.assistantPublicationSecretaryProfileId,
        },
        socialWelfareSecretary: {
          name: data.socialWelfareSecretary,
          profileId: data.socialWelfareSecretaryProfileId,
        },
        assistantSocialWelfareSecretary: {
          name: data.assistantSocialWelfareSecretary,
          profileId: data.assistantSocialWelfareSecretaryProfileId,
        },
      },
    };

    if (data._id) obj._id = data._id;
    return obj;
  }

  doSubmit = async () => {
    const { data } = this.state;
    const obj = this.mapToRequestModel(data);
    try {
      await saveInfo(obj);
      const navigate = this.props.navigate;
      navigate("/about");
    } catch (error) {
      toast.error("Error occured!");
      console.log(error);
    }
  };

  render() {
    return (
      <div className="mb-5">
        <h1>Update About</h1>
        <form onSubmit={this.handleSubmit}>
          <h2>Committee:</h2>
          <h4>President:</h4>
          {this.renderInput("president", "Name")}
          {this.renderInput("presidentDesignation", "Designation")}
          <h4>Vice President 1:</h4>
          {this.renderInput("vicePresident1", "Name")}
          {this.renderInput("vicePresident1Designation", "Designation")}
          <h4>Vice President 2:</h4>
          {this.renderInput("vicePresident2", "Name")}
          {this.renderInput("vicePresident2Designation", "Designation")}
          <h4>Treasurer:</h4>
          {this.renderInput("treasurer", "Name")}
          {this.renderInput("treasurerDesignation", "Designation")}
          <h2>Student Committee:</h2>

          {this.renderUserSelector(
            "generalSecretary",
            "General Secretary",
            this.state.options,
            this.state.programmersList
          )}
          {this.renderUserSelector(
            "assistantGeneralSecretary",
            "Assistant General Secretary",
            this.state.options,
            this.state.programmersList
          )}
          {this.renderUserSelector(
            "officeSecretary",
            "Office Secretary",
            this.state.options,
            this.state.programmersList
          )}
          {this.renderUserSelector(
            "assistantOfficeSecretary",
            "Assistant Office Secretary",
            this.state.options,
            this.state.programmersList
          )}
          {this.renderUserSelector(
            "financeSecretary",
            "Finance Secretary",
            this.state.options,
            this.state.programmersList
          )}
          {this.renderUserSelector(
            "assistantFinanceSecretary",
            "Assistant Finance Secretary",
            this.state.options,
            this.state.programmersList
          )}
          {this.renderUserSelector(
            "publicationSecretary",
            "Publication Secretary",
            this.state.options,
            this.state.programmersList
          )}
          {this.renderUserSelector(
            "assistantPublicationSecretary",
            "Assistant Publication Secretary",
            this.state.options,
            this.state.programmersList
          )}
          {this.renderUserSelector(
            "socialWelfareSecretary",
            "Social Welfare Secretary",
            this.state.options,
            this.state.programmersList
          )}
          {this.renderUserSelector(
            "assistantSocialWelfareSecretary",
            "Assistant Social Welfare Secretary",
            this.state.options,
            this.state.programmersList
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
