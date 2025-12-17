import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    username: {
      password: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
