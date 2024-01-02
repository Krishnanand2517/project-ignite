import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  articleTitle: {
    type: String,
    required: true,
    trim: true,
  },
  articleSlug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  coverImage: {
    type: String, // Link
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  content: {
    type: String, // Link
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
});

export const Article = mongoose.model("Article", articleSchema);
