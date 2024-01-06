import asyncHandler from "../utils/asyncHandler.js";
import { Course } from "../models/course.model.js";
import { Instructor } from "../models/instructor.model.js";
import { Content } from "../models/content.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";

const getAllContents = asyncHandler(async (_req, res) => {
  const contents = await Content.find({}).populate("course", {
    courseName: 1,
    courseSlug: 1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, contents, "Contents fetched successfully"));
});

const getContent = asyncHandler(async (req, res) => {
  const content = await Content.findById(req.params.id).populate("course", {
    courseName: 1,
    courseSlug: 1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, content, "Content fetched successfully"));
});

const editContentTitle = asyncHandler(async (req, res) => {
  if (req.account?.accountType !== "instructor") {
    throw new ApiError(
      403,
      "Permission denied. Only instructors can edit a course"
    );
  }

  const { contentTitle } = req.body;

  if (!contentTitle) {
    throw new ApiError(400, "Title is required");
  }

  const content = await Content.findById(req.params.id);
  const instructor = await Instructor.findOne({ account: req.account?._id });
  const course = await Course.findById(content.course._id);

  if (course.instructor.toString() !== instructor._id.toString()) {
    throw new ApiError(403, "This account cannot edit this content title");
  }

  content.contentTitle = contentTitle;
  await content.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Content updated successfully"));
});

const deleteContent = asyncHandler(async (req, res) => {
  if (req.account?.accountType !== "instructor") {
    throw new ApiError(
      403,
      "Permission denied. Only instructors can delete a course"
    );
  }

  const content = await Content.findById(req.params.id);
  const instructor = await Instructor.findOne({ account: req.account?._id });
  const course = await Course.findById(content.course._id);

  const oldContentFile = content.contentUrl;

  if (course.instructor.toString() !== instructor._id.toString()) {
    throw new ApiError(403, "This account cannot delete this content");
  }

  await content.deleteOne();

  const isOldContentFileDeleted = await deleteFromCloudinary(
    oldContentFile,
    content.contentType === "article",
    content.contentType === "video" ? "video" : "raw"
  );

  if (!isOldContentFileDeleted) {
    throw new ApiError(500, "Could not delete the old content file");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Content deleted successfully!"));
});

export { getAllContents, getContent, editContentTitle, deleteContent };
