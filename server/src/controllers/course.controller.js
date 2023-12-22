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
  const courseId = req.params.id;
  const course = await Course.findById(courseId)
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

  const { courseName, duration, category, difficulty } = req.body;
  console.log("course name:", courseName); // for debugging

  if (
    [courseName, duration, category, difficulty].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // handle image
  const courseImageLocalPath = req.files?.courseImage[0]?.path;

  if (!courseImageLocalPath) {
    throw new ApiError(400, "Course Image file is required");
  }

  // upload image to cloudinary
  const courseImage = await uploadOnCloudinary(courseImageLocalPath);

  if (!courseImage) {
    throw new ApiError(400, "Course Image file upload failed");
  }

  // create course object for DB
  const instructorAccountId = req.account?._id;

  const instructor = await Instructor.findOne({ account: instructorAccountId });

  const course = await Course.create({
    courseName,
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

  const { courseName, duration, category, difficulty } = req.body;
  console.log(courseName);

  if (
    [courseName, duration, category, difficulty].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const instructorAccountId = req.account?._id;
  const instructor = await Instructor.findOne({ account: instructorAccountId });

  const courseId = req.params?.id;
  const course = await Course.findById(courseId);

  if (course.instructor.toString() !== instructor._id.toString()) {
    throw new ApiError(403, "This instructor cannot edit this course");
  }

  await course.updateOne({
    $set: {
      courseName,
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
  const courseImageLocalPath = req.files?.courseImage[0]?.path;

  if (!courseImageLocalPath) {
    throw new ApiError(400, "Course image file is missing");
  }

  const courseImage = await uploadOnCloudinary(courseImageLocalPath);

  if (!courseImage.url) {
    throw new ApiError(500, "Failed to upload course image file");
  }

  const courseId = req.params?.id;
  const course = await Course.findById(courseId);
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
  const course = await Course.findById(req.params.id);

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

export {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourseDetails,
  updateCourseImage,
  deleteCourse,
};
