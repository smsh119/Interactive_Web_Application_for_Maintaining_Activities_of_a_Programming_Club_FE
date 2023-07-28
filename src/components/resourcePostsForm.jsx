import React from "react";
import Form from "./common/form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Joi from "joi-browser";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import { addPost } from "../services/resourcesService";
import Loading from "./common/loading";

class ResourcePostsFormC extends Form {
  state = {
    data: {
      heading: "",
      description: "",
      _id: null,
    },
    errors: {},
    loading: true,
  };

  schema = {
    _id: Joi.optional(),
    heading: Joi.string().required().max(100).label("Title"),
    description: Joi.string().required().label("Description"),
  };

  componentDidMount() {
    const location = this.props.location;
    const data = location.state;
    if (data) {
      this.setState({
        data: {
          heading: data.heading,
          description: data.text,
          _id: data._id,
        },
      });
      this.setState({});
    }
    this.setState({ loading: false });
  }

  mapToRequestModel = (data) => {
    const obj = {
      heading: data.heading,
      text: data.description,
      _id: data._id,
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
    if (this.state.loading) return <Loading />;
    return (
      <div>
        <h1>Add Post</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("heading", "Heading")}
          <p>Description</p>
          <JoditEditor
            ref={editor}
            value={this.state.data.description}
            onChange={(newContent) =>
              this.setState({
                data: {
                  description: newContent,
                  heading: this.state.data.heading,
                  _id: this.state.data._id,
                },
              })
            }
          />

          {this.renderButton("Save")}
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
