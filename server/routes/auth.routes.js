import { Router } from "express";
import { loginStudent, logoutStudent } from "../controllers/auth.controller.js";
import { validateStudentLoginData } from "../middlewares/validation.middleware.js";

const router = Router();

router.route("/login").post(validateStudentLoginData, loginStudent);

router.route("/logout").post(logoutStudent);

export default router;
