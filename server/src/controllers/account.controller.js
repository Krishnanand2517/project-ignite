import asyncHandler from "../utils/asyncHandler.js";
import { Account } from "../models/account.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerAccount = asyncHandler(async (req, res) => {
  const { username, email, password, fullName, accountType } = req.body;
  console.log("email:", email);

  if (
    [username, email, password, fullName, accountType].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // check for existing account
  const existingAccount = await Account.findOne({
    $or: [{ username }, { email }],
  });

  if (existingAccount) {
    throw new ApiError(409, "User with this username or email already exists");
  }

  // handle images
  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // upload to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file upload failed");
  }

  // create account object for DB
  const account = await Account.create({
    username,
    email,
    password,
    fullName,
    accountType,
    avatarImage: avatar.url,
  });

  // remove password and refresh token field from response
  const createdAccount = await Account.findById(account._id).select(
    "-password -refreshToken"
  );

  if (!createdAccount) {
    throw new ApiError(
      500,
      "Something went wrong while registering the account"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdAccount, "User registered successfully"));
});

export { registerAccount };
