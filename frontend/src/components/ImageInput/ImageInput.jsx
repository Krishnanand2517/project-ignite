import { useRef, useState } from "react";
import ReactModal from "react-modal";
import { ImageCropper } from "../index";

const defaultSrc = "/user_placeholder.png";

const ImageInput = ({ label, className = "", ...props }) => {
  const imageUploader = useRef(null);
  const [image, setImage] = useState(defaultSrc);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const getImage = (url) => {
    setImage(url);
    setIsCropperOpen(false);
  };

  const onInputChange = (e) => {
    e.preventDefault();

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);

    setIsCropperOpen(true);
    e.target.value = null;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={className}
    >
      <input
        type="file"
        ref={imageUploader}
        accept="image/png, image/jpeg"
        onChange={onInputChange}
        style={{ display: "none" }}
      />
      <div
        style={{
          height: "60px",
          width: "60px",
          border: "2px solid white",
          borderRadius: "50%",
        }}
        onClick={() => imageUploader.current.click()}
        {...props}
      >
        <img
          src={image}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
          }}
        />
      </div>
      {label}

      <ReactModal
        isOpen={isCropperOpen}
        onRequestClose={() => setIsCropperOpen(false)}
        style={{
          overlay: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: 480,
            height: 480,
            position: "relative",
          },
        }}
      >
        <div
          className="w-full flex justify-end cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setImage(defaultSrc);
            setIsCropperOpen(false);
          }}
        >
          &times;
        </div>
        <ImageCropper image={image} getImage={getImage} />
      </ReactModal>
    </div>
  );
};

export default ImageInput;
