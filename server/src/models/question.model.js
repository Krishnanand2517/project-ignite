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
        "strings",
        "hashmaps",
        "linked lists",
        "stacks",
        "queues",
        "trees",
        "graphs",
        "heaps",
        "recursion",
        "backtracking",
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
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
});

export const Question = mongoose.model("Question", questionSchema);
