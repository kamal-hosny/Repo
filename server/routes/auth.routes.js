import { Router } from "express";
import { loginStudent, logoutStudent } from "../controllers/auth.controller.js";

const router = Router();

router.route("/login").post(loginStudent);
router.route("/logout").post(logoutStudent);

export default router;
