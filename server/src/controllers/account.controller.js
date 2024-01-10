import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { Account } from "../models/account.model.js";
import { Instructor } from "../models/instructor.model.js";
import { Student } from "../models/student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const generateAccessAndRefreshTokens = async (accountId) => {
  try {
    const account = await Account.findById(accountId);
    const accessToken = account.generateAccessToken();
    const refreshToken = account.generateRefreshToken();

    account.refreshToken = refreshToken;
    await account.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

const registerAccount = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    password,
    fullName,
    accountType,
    collegeName,
    collegeProgramme,
    year,
  } = req.body;
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
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // upload to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(500, "Avatar file upload failed");
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

  switch (account.accountType) {
    case "instructor": {
      const instructor = await Instructor.create({
        instructorName: fullName,
        avatarImage: avatar.url,
        account: createdAccount._id,
      });

      break;
    }

    case "student": {
      if (
        [collegeName, collegeProgramme, year].some(
          (field) => field?.trim() === ""
        )
      ) {
        throw new ApiError(400, "All fields are required");
      }

      const student = await Student.create({
        studentName: fullName,
        collegeName,
        collegeProgramme,
        year,
        avatarImage: avatar.url,
        account: createdAccount._id,
      });

      break;
    }

    default:
      throw new ApiError(400, "Invalid account type");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdAccount, "User registered successfully"));
});

const loginAccount = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "Username or email is required");
  }

  const account = await Account.findOne({ $or: [{ username }, { email }] });

  if (!account) {
    throw new ApiError(404, "Account does not exist");
  }

  // password check
  const isPasswordValid = await account.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid account credentials");
  }

  // access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    account._id
  );

  // send secure cookie
  const loggedInAccount = await Account.findById(account._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          account: loggedInAccount,
          accessToken,
          refreshToken,
        },
        "Logged in successfully"
      )
    );
});

const logoutAccount = asyncHandler(async (req, res) => {
  await Account.findByIdAndUpdate(
    req.account._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Logged out!"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const account = await Account.findById(decodedToken?._id);

    if (!account) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    if (incomingRefreshToken !== account.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      account._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access Token refreshed!"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const account = await Account.findById(req.account?._id);
  const isPasswordCorrect = await account.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  account.password = newPassword;
  await account.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentAccount = asyncHandler(async (req, res) => {
  const account = req.account;

  if (!account) {
    throw new ApiError(400, "Account not logged in");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, account, "Current account fetched successfully")
    );
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { username, fullName } = req.body;

  if (!(username && fullName)) {
    throw new ApiError(400, "All fields are required");
  }

  const account = await Account.findByIdAndUpdate(
    req.account?._id,
    {
      $set: {
        username,
        fullName,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(200, account, "Account details updated successfully")
    );
});

const updateAccountAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(500, "Failed to upload avatar file");
  }

  const account = await Account.findById(req.account?._id);
  const oldAvatar = account.avatarImage;

  await account.updateOne({
    $set: {
      avatarImage: avatar.url,
    },
  });

  const isOldAvatarDeleted = await deleteFromCloudinary(oldAvatar);

  if (!isOldAvatarDeleted) {
    throw new ApiError(500, "Could not delete the old avatar");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Avatar updated successfully!"));
});

const deleteAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.account?._id);
  const oldAvatar = account.avatarImage;

  switch (account.accountType) {
    case "instructor":
      await Instructor.findOneAndDelete({ account: req.account?._id });
    case "student":
      await Student.findOneAndDelete({ account: req.account?._id });

    default:
      console.log("Invalid account type");
  }

  await account.deleteOne();

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  };

  res.clearCookie("accessToken", options).clearCookie("refreshToken", options);

  const isOldAvatarDeleted = await deleteFromCloudinary(oldAvatar);

  if (!isOldAvatarDeleted) {
    throw new ApiError(500, "Could not delete the old avatar");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Account deleted successfully!"));
});

export {
  registerAccount,
  loginAccount,
  logoutAccount,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentAccount,
  updateAccountDetails,
  updateAccountAvatar,
  deleteAccount,
};
