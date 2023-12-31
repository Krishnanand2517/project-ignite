import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Instructor } from "../models/instructor.model.js";

const getInstructor = asyncHandler(async (req, res) => {
  const accountId = req.account._id;
  const instructor = await Instructor.findOne({ account: accountId })
    .populate("account", {
      username: 1,
      email: 1,
    })
    .populate("courses", {
      courseName: 1,
      courseSlug: 1,
      courseImage: 1,
    });

  if (!instructor) {
    throw new ApiError(404, "This account does not belong to an instructor");
  }

  return res.json(
    new ApiResponse(200, instructor, "Instructor fetched successfully")
  );
});

export { getInstructor };
