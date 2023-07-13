import { login, logout, register, user } from "../controller/auth.js";
import { Router } from "express";
import { refreshToken } from "../controller/refreshToken.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.get("/user", verifyToken, user);
router.get("/token", refreshToken);
router.post("/login", login);
router.post("/register", register);
router.delete("/logout", logout);

export default router;
