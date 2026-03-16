import mongoose from "mongoose";
export const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to db");
  } catch (e) {
    console.error(e.message);
  }
};
