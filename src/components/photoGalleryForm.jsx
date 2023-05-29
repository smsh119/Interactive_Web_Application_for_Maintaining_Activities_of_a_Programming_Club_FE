import React from "react";
import Form from "./common/form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Joi from "joi-browser";
import { addPhoto } from "../services/galleryService";
import dayjs from "dayjs";
import { toast } from "react-toastify";

class PhotoGalleryFormC extends Form {
  state = {
    data: {
      //   header: "",
      description: "",
      photo: null,
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    // header: Joi.string().required().max(100).label("Title"),
    description: Joi.string().required().max(300).label("Description"),
    photo: Joi.object().required(),
  };

  mapToViewModel = (data) => {
    const formData = new FormData();

    // formData.append("header", data.header);
    formData.append("description", data.description);
    formData.append("photo", data.photo);

    return formData;
  };

  doSubmit = async () => {
    const date = this.state.data.date;
    const ddate = dayjs(date).toISOString();
    this.setState({ date: ddate });
    const data = this.mapToViewModel(this.state.data);

    // for (var pair of data.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    try {
      await addPhoto(data);
      //   const navigate = this.props.navigate;
      window.location = "/photoGallery";
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <span onClick={this.props.onClose}>&times;</span>
        <h1>Add Photo</h1>
        <form onSubmit={this.handleSubmit}>
          {/* {this.renderInput("header", "Title")} */}
          {this.renderInput("description", "Descripition")}
          {this.renderSelectFile("photo", "Select Photo")}

          {this.renderButton("Add")}
        </form>
      </div>
    );
  }
}

export function PhotoGalleryForm(props) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <PhotoGalleryFormC
      {...props}
      params={params}
      navigate={navigate}
      location={location}
    ></PhotoGalleryFormC>
  );
}

export default PhotoGalleryForm;
