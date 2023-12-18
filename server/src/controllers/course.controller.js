import asyncHandler from "../utils/asyncHandler.js";
import { Course } from "../models/course.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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

  res.json(course);
});

const createCourse = asyncHandler(async (req, res) => {
  if (req.account.accountType !== "instructor") {
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
  const instructorId = req.account._id;

  const course = await Course.create({
    courseName,
    courseImage: courseImage.url,
    duration,
    category,
    difficulty,
    instructor: instructorId,
  });

  const createdCourse = await Course.findById(course._id);

  if (!createdCourse) {
    throw new ApiError(500, "Something went wrong while creating the course");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdCourse, "Course created successfully"));
});

export { getAllCourses, getCourse, createCourse };
