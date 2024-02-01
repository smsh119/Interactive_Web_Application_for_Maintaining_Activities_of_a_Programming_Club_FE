import getImgUrl from "../services/imgService";

function ImagePopUp({ file, setFile }) {
    return (
        <div
            className="popup-media"
            style={{ display: file ? "block" : "none" }}
        >
            <span onClick={() => setFile(null)}>&times;</span>
            <img src={file && getImgUrl(file)} alt="" />
        </div>
    );
}

export default ImagePopUp;
