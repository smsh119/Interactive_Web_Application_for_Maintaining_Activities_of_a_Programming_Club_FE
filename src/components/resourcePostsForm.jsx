import React from "react";
import Form from "./common/form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Joi from "joi-browser";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import { addPost } from "../services/resourcesService";

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
    description: Joi.string().required().min(15).label("Description"),
  };

  mapToRequestModel = (data) => {
    const obj = {
      heading: data.heading,
      text: data.description,
    };
    return obj;
  };

  doSubmit = async () => {
    try {
      const data = this.mapToRequestModel(this.state.data);
      await addPost(data);
      this.props.navigate("/resources");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const editor = this.props.editor;
    return (
      <div>
        <h1>Add Post</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("heading", "Heading")}
          <p>Description</p>
          <JoditEditor
            ref={editor}
            value={this.state.description}
            onChange={(newContent) =>
              this.setState({
                data: {
                  description: newContent,
                  heading: this.state.data.heading,
                },
              })
            }
          />

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
  const editor = useRef(null);
  return (
    <ResourcePostsFormC
      {...props}
      params={params}
      navigate={navigate}
      location={location}
      editor={editor}
    ></ResourcePostsFormC>
  );
}

export default ResourcePostsForm;
