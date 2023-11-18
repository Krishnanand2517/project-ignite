import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
    trim: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  avatarImage: {
    type: String, // Link
  },
});

export const Admin = mongoose.model("Admin", adminSchema);
