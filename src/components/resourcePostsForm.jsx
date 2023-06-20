import React from "react";
import Form from "./common/form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Joi from "joi-browser";

class ResourcePostsFormC extends Form {
  state = {
    data: {
      heading: "",
      description: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    heading: Joi.string().required().max(100).label("Title"),
    description: Joi.string().required().label("Description"),
  };

  //   mapToViewModel = (data) => {
  //     const formData = new FormData();

  //     formData.append("heading", data.heading);
  //     formData.append("description", data.description);
  //     formData.append("photo", data.photo);

  //     return formData;
  //   };

  doSubmit = async () => {
    // const data = this.mapToViewModel(this.state.data);
    // try {
    //   await addPhoto(data);
    //   window.location = "/photoGallery";
    // } catch (e) {
    //   console.log(e);
    // }
  };

  render() {
    return (
      <div>
        <span onClick={this.props.onClose}>&times;</span>
        <h1>Add Post</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("heading", "Heading")}
          {this.renderTextarea("description", "Descripition")}

          {this.renderButton("Add")}
        </form>
      </div>
    );
  }
}

export function ResourcePostsForm(props) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <ResourcePostsFormC
      {...props}
      params={params}
      navigate={navigate}
      location={location}
    ></ResourcePostsFormC>
  );
}

export default ResourcePostsForm;
