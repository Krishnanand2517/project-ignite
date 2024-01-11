import asyncHandler from "../utils/asyncHandler.js";
import { Content } from "../models/content.model.js";
import { Instructor } from "../models/instructor.model.js";
import { Course } from "../models/course.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const getAllCourses = asyncHandler(async (_req, res) => {
  const courses = await Course.find({})
    .populate("instructor", {
      instructorName: 1,
      avatarImage: 1,
    })
    .populate("contents", {
      contentTitle: 1,
    });

  return res.json(courses);
});

const getCourse = asyncHandler(async (req, res) => {
  const courseSlug = req.params.slug;
  const course = await Course.findOne({ courseSlug })
    .populate("instructor", {
      instructorName: 1,
      avatarImage: 1,
    })
    .populate("contents");

  return res.json(course);
});

const createCourse = asyncHandler(async (req, res) => {
  if (req.account?.accountType !== "instructor") {
    throw new ApiError(
      403,
      "Permission denied. Only instructors can add courses."
    );
  }

  const { courseName, courseSlug, duration, category, difficulty } = req.body;
  console.log("course name:", courseName); // for debugging

  if (
    [courseName, courseSlug, duration, category, difficulty].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // handle image
  const courseImageLocalPath = req.files?.courseImage[0]?.buffer;

  if (!courseImageLocalPath) {
    throw new ApiError(400, "Course Image file is required");
  }

  // upload image to cloudinary
  const courseImage = await uploadOnCloudinary(courseImageLocalPath);

  if (!courseImage) {
    throw new ApiError(500, "Course Image file upload failed");
  }

  // create course object for DB
  const instructorAccountId = req.account?._id;

  const instructor = await Instructor.findOne({ account: instructorAccountId });

  const course = await Course.create({
    courseName,
    courseSlug,
    courseImage: courseImage.url,
    duration,
    category,
    difficulty,
    instructor: instructor._id,
  });

  const createdCourse = await Course.findById(course._id);

  if (!createdCourse) {
    throw new ApiError(500, "Something went wrong while creating the course");
  }

  instructor.courses = instructor.courses.concat(createdCourse._id);
  await instructor.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(new ApiResponse(201, createdCourse, "Course created successfully"));
});

const updateCourseDetails = asyncHandler(async (req, res) => {
  if (req.account?.accountType !== "instructor") {
    throw new ApiError(
      403,
      "Permission denied. Only instructors can update a course."
    );
  }

  const { courseName, courseSlug, duration, category, difficulty } = req.body;
  console.log(courseName);

  if (
    [courseName, courseSlug, duration, category, difficulty].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const instructorAccountId = req.account?._id;
  const instructor = await Instructor.findOne({ account: instructorAccountId });

  const courseSlugToChange = req.params.slug;
  const course = await Course.findOne({ courseSlug: courseSlugToChange });

  if (course.instructor.toString() !== instructor._id.toString()) {
    throw new ApiError(403, "This instructor cannot edit this course");
  }

  await course.updateOne({
    $set: {
      courseName,
      courseSlug,
      duration,
      category,
      difficulty,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Course details updated successfully"));
});

const updateCourseImage = asyncHandler(async (req, res) => {
  const courseImageLocalPath = req.files?.courseImage[0]?.buffer;

  if (!courseImageLocalPath) {
    throw new ApiError(400, "Course image file is missing");
  }

  const courseImage = await uploadOnCloudinary(courseImageLocalPath);

  if (!courseImage.url) {
    throw new ApiError(500, "Failed to upload course image file");
  }

  const courseSlug = req.params.slug;
  const course = await Course.findOne({ courseSlug });
  const oldCourseImage = course.courseImage;

  await course.updateOne({
    $set: {
      courseImage: courseImage.url,
    },
  });

  const isOldImageDeleted = await deleteFromCloudinary(oldCourseImage);

  if (!isOldImageDeleted) {
    throw new ApiError(500, "Could not delete the old image");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Course image updated successfully!"));
});

const deleteCourse = asyncHandler(async (req, res) => {
  if (req.account?.accountType !== "instructor") {
    throw new ApiError(
      403,
      "Permission denied. Only instructors can delete a course"
    );
  }

  const instructor = await Instructor.findOne({ account: req.account?._id });

  const courseSlug = req.params.slug;
  const course = await Course.findOne({ courseSlug });

  const oldCourseImage = course.courseImage;

  if (course.instructor.toString() !== instructor._id.toString()) {
    throw new ApiError(403, "This instructor cannot delete this course");
  }

  await course.deleteOne();

  const isOldImageDeleted = await deleteFromCloudinary(oldCourseImage);

  if (!isOldImageDeleted) {
    throw new ApiError(500, "Could not delete the old image");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Course deleted successfully!"));
});

const addContent = asyncHandler(async (req, res) => {
  if (req.account?.accountType !== "instructor") {
    throw new ApiError(
      403,
      "Permission denied. Only instructors can add content to a course"
    );
  }

  const { contentTitle, contentType } = req.body;

  if ([contentTitle, contentType].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const contentFileLocalPath = req.file?.buffer;

  if (!contentFileLocalPath) {
    throw new ApiError(400, "Content file is missing");
  }

  const contentFile = await uploadOnCloudinary(contentFileLocalPath);

  if (!contentFile) {
    throw new ApiError(500, "Content file upload failed");
  }

  const instructor = await Instructor.findOne({ account: req.account?._id });
  const course = await Course.findOne({ courseSlug: req.params.slug });

  if (course.instructor.toString() !== instructor._id.toString()) {
    throw new ApiError(403, "This instructor cannot modify this course");
  }

  const content = await Content.create({
    contentTitle,
    contentType,
    contentUrl: contentFile.url,
    course: course._id,
  });

  if (!content) {
    throw new ApiError(500, "Something went wrong while creating the content");
  }

  course.contents = course.contents.concat(content._id);
  await course.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(new ApiResponse(201, content, "Content added successfully"));
});

export {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourseDetails,
  updateCourseImage,
  deleteCourse,
  addContent,
};
