import { Router } from "express";
import { login, logout } from "../controllers/auth.controller.js";
import { validateLoginData } from "../middlewares/validation.middleware.js";

const router = Router();

router.route("/login").post(validateLoginData, login);

router.route("/logout").post(logout);

export default router;
