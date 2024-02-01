import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../services/authService";
import { deletePhoto, getPhotos } from "../../services/galleryService";
import getImgUrl from "../../services/imgService";
import Loading from "../common/loading";
import ImagePopUp from "../imagePopUp";
import PhotoGalleryForm from "./photoGalleryForm";

function PhotoGallery() {
    const [media, setMedia] = useState(null);
    const [file, setFile] = useState(null);
    const [showDes, setShowDes] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const isAdmin = getCurrentUser() ? getCurrentUser().isAdmin : false;
    useEffect(() => {
        async function fetchData() {
            const { data: media } = await getPhotos();
            media.reverse();
            setMedia(media);
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const handleDelete = async (photo) => {
        let data = [...media];
        const indx = data.indexOf(photo);
        data = [...data.slice(0, indx), ...data.slice(indx + 1)];
        setMedia(data);
        try {
            await deletePhoto(photo._id);
            toast("Deleted Successfully!");
        } catch (error) {
            console.log(error.message);
            window.location.reload();
        }
    };

    if (loading) return <Loading />;
    return (
        <div className="galleryContainer">
            <h1>Photo Gallery</h1>
            {isAdmin && (
                <button
                    className="btn btn-lg custom-btn"
                    onClick={handleShowForm}
                >
                    Add Photo
                </button>
            )}
            {showForm && (
                <div className="galleryFrom">
                    <PhotoGalleryForm onClose={handleShowForm} />
                </div>
            )}
            <div className="media-container">
                {media.map((file, index) => {
                    return (
                        <div key={index}>
                            <div
                                className="media"
                                key={index}
                                onClick={() => setFile(file.photoLink)}
                                onMouseOver={() => setShowDes(file.photoLink)}
                                onMouseLeave={() => setShowDes(null)}
                            >
                                <img src={getImgUrl(file.photoLink)} alt="" />
                                <div
                                    style={{
                                        display:
                                            showDes === file.photoLink
                                                ? "block"
                                                : "none",
                                    }}
                                >
                                    <h5>{file.heading}</h5>
                                    {file.description}
                                </div>
                            </div>
                            {isAdmin && (
                                <button
                                    className="btn btn-danger btn-sm"
                                    style={{ width: "100%", zIndex: "0" }}
                                    onClick={() => handleDelete(file)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            <ImagePopUp file={file} setFile={setFile} />
        </div>
    );
}

export default PhotoGallery;
