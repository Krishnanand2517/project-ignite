import { useRef, useState } from "react";
import ReactModal from "react-modal";
import { ImageCropper } from "../index";
import { dataURItoBlob } from "./dataUriToBlob";

const ImageInput = ({
  defaultSrc = "/user_placeholder.png",
  label = "",
  className = "",
  size = "h-14 w-14 2xl:h-16 2xl:w-16",
  padding = "p-0",
  rounded = "rounded-full",
  setOutputImage,
  isSquare = true,
  ...props
}) => {
  const imageUploader = useRef(null);
  const [image, setImage] = useState(defaultSrc);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const getImage = (url) => {
    setImage(url);
    setIsCropperOpen(false);

    const blob = dataURItoBlob(url);
    const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
    setOutputImage(file);
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
      className={`flex flex-col items-center justify-center 2xl:text-xl ${className}`}
    >
      <input
        type="file"
        ref={imageUploader}
        accept="image/png, image/jpeg"
        onChange={onInputChange}
        className="hidden"
      />
      <div
        className={`${size} ${padding} border-2 border-solid border-white hover:border-orange-500 cursor-pointer ${rounded} 2xl:mb-4`}
        onClick={() => imageUploader.current.click()}
        {...props}
      >
        <img src={image} className={`w-full h-full ${rounded}`} />
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
        <ImageCropper image={image} getImage={getImage} isSquare={isSquare} />
      </ReactModal>
    </div>
  );
};

export default ImageInput;
