import Joi from "joi-browser";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addFile } from "../../services/resourcesService";
import Form from "../common/form";

class ResourceFilesFormC extends Form {
    state = {
        data: {
            heading: "",
            file: null,
        },
        errors: {},
    };

    schema = {
        _id: Joi.string(),
        heading: Joi.string().required().max(100).label("Title"),
        file: Joi.object().required().label("File"),
    };

    mapToRequestModel = (data) => {
        const formData = new FormData();

        formData.append("heading", data.heading);
        formData.append("file", data.file);

        return formData;
    };

    doSubmit = async () => {
        try {
            const file = this.mapToRequestModel(this.state.data);
            await addFile(file);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <div>
                <span onClick={this.props.onClose}>&times;</span>
                <h1>Add File</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("heading", "Heading")}
                    {this.renderSelectFile("file", "Select File")}

                    {this.renderButton("Add")}
                </form>
            </div>
        );
    }
}

export function ResourceFilesForm(props) {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <ResourceFilesFormC
            {...props}
            params={params}
            navigate={navigate}
            location={location}
        ></ResourceFilesFormC>
    );
}

export default ResourceFilesForm;
