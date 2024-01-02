import { Article } from "../models/article.model.js";
import { Account } from "../models/account.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getArticle = asyncHandler(async (req, res) => {
  const articleSlug = req.params.slug;
  const article = await Article.findOne({ articleSlug }).populate("author", {
    fullName: 1,
    username: 1,
    avatarImage: 1,
  });

  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, article, "Article fetched successfully!"));
});

const createArticle = asyncHandler(async (req, res) => {
  const { articleTitle, articleSlug, tags } = req.body;
  console.log("articleTitle:", articleTitle);

  if ([articleTitle, articleSlug].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  const contentLocalPath = req.files?.content[0]?.path;

  if (!contentLocalPath) {
    throw new ApiError(400, "Content file is required");
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  const content = await uploadOnCloudinary(contentLocalPath);

  if (!content) {
    throw new ApiError(500, "Content file upload failed");
  }

  const article = await Article.create({
    articleTitle,
    articleSlug,
    coverImage: coverImage?.url,
    author: req.account?._id,
    content: content.url,
    tags,
  });

  if (!article) {
    throw new ApiError(500, "Something went wrong while creating article");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, article, "Article created successfully"));
});

export { getArticle, createArticle };
