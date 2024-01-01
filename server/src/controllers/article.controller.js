import { Article } from "../models/article.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

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

  return res.json(
    new ApiResponse(200, article, "Article fetched successfully!")
  );
});

export { getArticle };
