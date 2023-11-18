import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  contentTitle: {
    type: String,
    required: true,
    trim: true,
  },
  contentType: {
    type: String,
    enum: ["video", "document", "exercise"],
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

export const Content = mongoose.model("Content", contentSchema);
