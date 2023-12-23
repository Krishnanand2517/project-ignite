import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  courseSlug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  courseImage: {
    type: String, // Link
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "expert"],
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
  contents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
    },
  ],
});

export const Course = mongoose.model("Course", courseSchema);
