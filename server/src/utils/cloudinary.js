import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { extractPublicId } from "cloudinary-build-url";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File is uploaded on cloudinary", response.url);

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (
  remoteFileUrl,
  isMdFile = false,
  type = "image"
) => {
  try {
    if (!remoteFileUrl) return false;

    const remoteFilePublicId = extractPublicId(remoteFileUrl);

    const response = await cloudinary.uploader.destroy(
      isMdFile ? remoteFilePublicId.toString() + ".md" : remoteFilePublicId,
      { resource_type: type },
      (err, result) => {
        console.log(result, err);
      }
    );

    console.log("File deleted from cloudinary", response);

    return true;
  } catch (error) {
    console.log("Cloudinary Error:", error.message || "Deletion failed");
    return false;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
