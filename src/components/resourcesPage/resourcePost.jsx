import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";
import { getPost } from "../../services/resourcesService";
import Loading from "../common/loading";

function ResourcePost() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const params = useParams();
    const navigate = useNavigate();
    const postId = params.id;
    const isAdmin = getCurrentUser() ? getCurrentUser().isAdmin : false;

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await getPost(postId);
                setData(data);
                setLoading(false);
            } catch (e) {
                console.log(e.response);
            }
        }
        fetchData();
    }, []);

    const handleEdit = () => {
        navigate("/resources/edit", { state: data });
    };

    if (loading) return <Loading />;

    return (
        <div>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <h1>{data.heading}</h1>
                {isAdmin && (
                    <button
                        className="btn btn-md custom-btn"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                )}
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.text }}></div>
        </div>
    );
}

export default ResourcePost;