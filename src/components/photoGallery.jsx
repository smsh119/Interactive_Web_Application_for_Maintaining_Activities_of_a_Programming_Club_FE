import React, { useEffect, useState } from "react";
import PhotoGalleryForm from "./photoGalleryForm";
import { getPhotos } from "../services/galleryService";
import getImgUrl from "../services/imgService";
import ImagePopUp from "./imagePopUp";
import { getCurrentUser } from "../services/authService";

function PhotoGallery(props) {
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

  if (loading) return null;
  return (
    <div className="galleryContainer">
      <h1>Photo Gallery</h1>
      {isAdmin && (
        <button className="btn btn-lg custom-btn" onClick={handleShowForm}>
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
                  display: showDes === file.photoLink ? "block" : "none",
                }}
              >
                <h5>{file.heading}</h5>
                {file.description}
              </div>
            </div>
          );
        })}
      </div>

      <ImagePopUp file={file} setFile={setFile} />
    </div>
  );
}

export default PhotoGallery;
