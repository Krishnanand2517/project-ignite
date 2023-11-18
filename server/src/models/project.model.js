import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "expert"],
    required: true,
  },
  duration: {
    type: Number,
    min: 1, // hours
    required: true,
  },
  category: {
    type: String,
    enum: ["ai-ml", "blockchain", "flutter", "nodejs", "react", "react-native"],
    required: true,
  },
});

export const Project = mongoose.model("Project", projectSchema);
