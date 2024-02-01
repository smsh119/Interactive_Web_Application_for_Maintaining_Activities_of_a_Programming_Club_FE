import Joi from "joi-browser";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addPhoto } from "../../services/galleryService";
import Form from "../common/form";

class PhotoGalleryFormC extends Form {
    state = {
        data: {
            heading: "",
            description: "",
            photo: null,
        },
        errors: {},
    };

    schema = {
        _id: Joi.string(),
        heading: Joi.string().required().max(100).label("Title"),
        description: Joi.string().required().max(250).label("Description"),
        photo: Joi.object().required(),
    };

    mapToRequestModel = (data) => {
        const formData = new FormData();

        formData.append("heading", data.heading);
        formData.append("description", data.description);
        formData.append("photo", data.photo);

        return formData;
    };

    doSubmit = async () => {
        const data = this.mapToRequestModel(this.state.data);

        try {
            await addPhoto(data);
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
                    {this.renderInput("heading", "Heading")}
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
