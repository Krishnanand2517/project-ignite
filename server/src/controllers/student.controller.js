import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Student } from "../models/student.model.js";

const getStudent = asyncHandler(async (req, res) => {
  const accountId = req.account._id;
  const student = await Student.findOne({ account: accountId })
    .populate("account", {
      username: 1,
      email: 1,
    })
    .populate("courses", {
      courseName: 1,
      courseSlug: 1,
      courseImage: 1,
    });

  if (!student) {
    throw new ApiError(404, "This account does not belong to a student");
  }

  return res.json(
    new ApiResponse(200, student, "Student fetched successfully")
  );
});

export { getStudent };
