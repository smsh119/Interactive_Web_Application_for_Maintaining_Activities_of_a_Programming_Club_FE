import React, { useEffect, useState } from "react";
import PhotoGalleryForm from "./photoGalleryForm";
import { getPhotos } from "../services/galleryService";
import getImgUrl from "../services/imgService";

function PhotoGallery(props) {
  const [media, setMedia] = useState(null);
  const [file, setFile] = useState(null);
  const [showDes, setShowDes] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

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
      <button className="btn btn-lg custom-btn" onClick={handleShowForm}>
        Add Photo
      </button>
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
                <h5>
                  This is a heading i am righting for testing and it overflows
                </h5>
                {file.description}
              </div>
            </div>
          );
        })}
      </div>

      <div className="popup-media" style={{ display: file ? "block" : "none" }}>
        <span onClick={() => setFile(null)}>&times;</span>
        <img src={file && getImgUrl(file)} alt="" />
      </div>
    </div>
  );
}

export default PhotoGallery;
