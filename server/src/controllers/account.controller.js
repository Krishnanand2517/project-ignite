import asyncHandler from "../utils/asyncHandler.js";
import { Account } from "../models/account.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerAccount = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Account registered!",
  });
});

export { registerAccount };
