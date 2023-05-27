import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";

export function TestCC() {
  const [img, setImg] = useState("");

  const handleProPicChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      setImg(file);
      console.log(img);
    } else {
      setImg(null);
    }
  };

  return (
    <div className="">
      <InputText
        type="file"
        accept="/img/*"
        onChange={(e) => handleProPicChange(e)}
      />
    </div>
  );

  // return (
  //   <div className="card flex justify-content-center">
  //     <FileUpload
  //       mode="basic"
  //       name="demo[]"
  //       url="/api/upload"
  //       accept="image/*"
  //       maxFileSize={1000000}
  //       onUpload={(e) => handleChange}
  //       chooseLabel="Browse"
  //     />
  //   </div>
  // );
}

export default TestCC;
