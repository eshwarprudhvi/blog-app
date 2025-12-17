import { Router } from "express";
import { createUser, loginUser, logoutUser } from "../controllers/user.js";
import protect from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/", createUser);
router.post("/login", loginUser);

router.post("/logout", logoutUser);

export default router;
