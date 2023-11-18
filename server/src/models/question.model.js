import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionTitle: {
    type: String,
    required: true,
    trim: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  topics: [
    {
      type: String,
      enum: [
        "arrays",
        "hashmaps",
        "linked lists",
        "stacks",
        "queues",
        "trees",
        "graphs",
        "heaps",
        "recursion",
        "dynamic programming",
        "tries",
        "others",
      ],
      required: true,
    },
  ],
  problemLink: {
    type: String,
    required: true,
  },
  solutionLink: {
    type: String,
  },
  companyTags: [
    {
      type: String,
    },
  ],
});

export const Question = mongoose.model("Question", questionSchema);
