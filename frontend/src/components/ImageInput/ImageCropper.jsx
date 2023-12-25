import { createRef } from "react";
import ReactCropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "../index";

const ImageCropper = ({ image, getImage }) => {
  const cropperRef = createRef();

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      getImage(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* CROP CONTAINER */}
      <div className="w-60 h-60 lg:w-80 lg:h-80 relative">
        <ReactCropper
          ref={cropperRef}
          zoomTo={0.5}
          preview=".img-preview"
          src={image}
          aspectRatio={1}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={true}
          className="w-full h-full"
        />
      </div>

      <Button
        onClick={getCropData}
        textSize="text-lg 2xl:text-2xl"
        className="font-bold my-5 py-3"
      >
        Update Image
      </Button>
    </div>
  );
};

export default ImageCropper;
