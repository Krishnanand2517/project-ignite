import { useRef, useState } from "react";
import ReactModal from "react-modal";
import { ImageCropper } from "../index";
import { dataURItoBlob } from "./dataUriToBlob";

const ImageInput = ({
  defaultSrc = "/user_placeholder.png",
  label = "",
  className = "",
  size = "h-14 w-14",
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
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(files[0]);
    setIsCropperOpen(true);
    e.target.value = null;
  };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <input
        type="file"
        ref={imageUploader}
        accept="image/png, image/jpeg"
        onChange={onInputChange}
        className="hidden"
      />

      <div
        className={`${size} ${padding} relative border-2 border-[rgba(255,255,255,0.12)] hover:border-amber-500 cursor-pointer transition-all duration-200 overflow-hidden ${rounded} group`}
        onClick={() => imageUploader.current.click()}
        {...props}
      >
        <img
          src={image}
          className={`w-full h-full object-cover ${rounded}`}
          alt="upload"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-inherit">
          <span className="text-xs font-mono text-white">Change</span>
        </div>
      </div>

      {label && (
        <span className="text-xs font-mono text-neutral-500">{label}</span>
      )}

      <ReactModal
        isOpen={isCropperOpen}
        onRequestClose={() => setIsCropperOpen(false)}
        style={{
          overlay: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(8px)",
            zIndex: 1000,
          },
          content: {
            width: 480,
            height: 500,
            position: "relative",
            background: "#17171b",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "20px",
            inset: "auto",
          },
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-syne font-semibold text-neutral-100">
            Crop image
          </span>
          <button
            className="text-neutral-500 hover:text-neutral-100 transition-colors text-xl leading-none"
            onClick={(e) => {
              e.preventDefault();
              setImage(defaultSrc);
              setIsCropperOpen(false);
            }}
          >
            ×
          </button>
        </div>
        <ImageCropper image={image} getImage={getImage} isSquare={isSquare} />
      </ReactModal>
    </div>
  );
};

export default ImageInput;
