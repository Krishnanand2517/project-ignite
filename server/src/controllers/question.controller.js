import asyncHandler from "../utils/asyncHandler.js";
import { Question } from "../models/question.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({}).populate("addedBy", {
    fullName: 1,
    avatarImage: 1,
  });

  return res.json(questions);
});

const addQuestion = asyncHandler(async (req, res) => {
  const { questionTitle, difficulty, topics, problemLink, companyTags } =
    req.body;

  if (
    [questionTitle, difficulty, topics, problemLink, companyTags].some(
      (field) =>
        Array.isArray(field) ? field.length <= 0 : field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const question = await Question.create({
    questionTitle,
    difficulty,
    topics,
    problemLink,
    companyTags,
    addedBy: req.account?._id,
  });

  const createdQuestion = await Question.findById(question._id);

  if (!createdQuestion) {
    throw new ApiError(500, "Something went wrong while adding the question");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdQuestion, "Question added successfully"));
});

export { getAllQuestions, addQuestion };
