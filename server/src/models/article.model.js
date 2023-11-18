import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

const articleSchema = new mongoose.Schema({
  articleTitle: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: authorSchema,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
});

export const Article = mongoose.model("Article", articleSchema);
