import React, { useState } from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img7 from "../assets/img7.jpg";
import img8 from "../assets/img8.jpg";
import img9 from "../assets/img9.jpg";
import img10 from "../assets/img10.jpg";
import img11 from "../assets/img11.jpg";
import img12 from "../assets/img12.jpg";

function PhotoGallery(props) {
  const [file, setFile] = useState(null);
  const [showDes, setShowDes] = useState(false);
  const media = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
  ];
  return (
    <div className="galleryContainer">
      <h1>Photo Gallery</h1>
      <div className="media-container">
        {media.map((file, index) => {
          return (
            <div
              className="media"
              key={index}
              onClick={() => setFile(file)}
              onMouseOver={() => setShowDes(file)}
              onMouseLeave={() => setShowDes(null)}
            >
              <img src={file} alt="" />
              <div style={{ display: showDes === file ? "block" : "none" }}>
                <h5>Heading</h5>
                image descriptionasdf Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Cum eum veniam, excepturi rem earum hic quos
                necessitatibus incidunt iste voluptatem? Minima culpa
                laboriosam, dolorum tenetur dolorem nesciunt tempore? Maiores,
                ipsa!
              </div>
            </div>
          );
        })}
      </div>

      <div className="popup-media" style={{ display: file ? "block" : "none" }}>
        <span onClick={() => setFile(null)}>&times;</span>
        <img src={file} alt="" />
      </div>
    </div>
  );
}

export default PhotoGallery;
