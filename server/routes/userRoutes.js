import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  loginUser,
  logoutUser,
  updateUserById,
} from "../controllers/user.js";
import protect from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/", createUser);
router.post("/login", loginUser);

router.post("/logout", logoutUser);
router.get("/", getUsers);
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUserById);
router.delete("/:id", protect, deleteUserById);

export default router;
