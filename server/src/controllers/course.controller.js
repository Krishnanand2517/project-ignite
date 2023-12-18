import asyncHandler from "../utils/asyncHandler.js";
import { Course } from "../models/course.model.js";

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
  const { courseName, courseImage, duration, category, difficulty } = req.body;
});

export { getAllCourses, getCourse, createCourse };
