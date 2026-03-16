import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getMe,
  getUserById,
  getUsers,
  loginUser,
  logoutUser,
  updateUserById,
  updateProfile,
} from "../controllers/user.js";
import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
const router = Router();

router.post("/", createUser);
router.post("/login", loginUser);

router.post("/logout", logoutUser);
router.get("/", getUsers);
router.get("/me", protect, getMe);
router.get("/:id", getUserById);
router.put("/profile", protect, upload.single("profile"), updateProfile);
router.put("/:id", protect, updateUserById);
router.delete("/:id", protect, deleteUserById);

export default router;
