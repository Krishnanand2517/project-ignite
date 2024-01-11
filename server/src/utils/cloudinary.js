import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
// import fs from "fs";
import { extractPublicId } from "cloudinary-build-url";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ***************** USING LOCAL PATH ********************* //

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;

//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });

//     console.log("File is uploaded on cloudinary", response.url);

//     fs.unlinkSync(localFilePath);
//     return response;
//   } catch (error) {
//     fs.unlinkSync(localFilePath);
//     return null;
//   }
// };

// ***************** USING FILE BUFFER ********************* //

const uploadOnCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer) return null;

    const stream = streamifier.createReadStream(fileBuffer);

    const response = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );

      stream.pipe(uploadStream);
    });

    console.log("File is uploaded on Cloudinary", response.url);

    return response;
  } catch (error) {
    console.log("Cloudinary Error:", error.message || "Upload failed");
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
