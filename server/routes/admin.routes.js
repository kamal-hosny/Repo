import { Router } from "express";
// Middlewares
import authinticate from "../middlewares/authintication.middleware.js";
import authorize from "../middlewares/authorization.middleware.js";
import { createStudent, createAdmin } from "../controllers/admin.controller.js";

const router = Router();

router.route("/new-super-admin").post( createAdmin);
router.route("/student").post(authinticate, authorize("admin"), createStudent)

export default router;