import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
  instructorName: {
    type: String,
    required: true,
    trim: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
});

export const Instructor = mongoose.model("Instructor", instructorSchema);
