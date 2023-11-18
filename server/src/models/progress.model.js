import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  completion_percent: {
    type: Number,
    required: true,
  },
  certificates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Certificate",
    },
  ],
});

export const Progress = mongoose.model("Progress", progressSchema);
