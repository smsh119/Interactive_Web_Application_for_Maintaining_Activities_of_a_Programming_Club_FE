import loadingGIF from "../../assets/loading.svg";

function Loading() {
    const style = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "10%",
    };
    return (
        <div>
            <img style={style} src={loadingGIF} alt="" />
        </div>
    );
}

export default Loading;
