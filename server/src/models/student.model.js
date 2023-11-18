import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  collegeProgramme: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    min: 1,
    max: 6,
    required: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

export const Student = mongoose.model("Student", studentSchema);
