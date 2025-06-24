import { Router } from "express";
// Middlewares
import authinticate from "../middlewares/authintication.middleware.js";
import authorize from "../middlewares/authorization.middleware.js";
import { createStudent, createAdmin } from "../controllers/admin.controller.js";
import {
  createTeacher,
  updateTeacher,
} from "../controllers/admin.controller.js";

const router = Router();

router
  .route("/new-admin")
  .post(authinticate, authorize(["super-admin"]), createAdmin);
router
  .route("/student")
  .post(authinticate, authorize(["admin", "super-admin"]), createStudent);
router
  .route("/teacher")
  .post(authinticate, authorize(["admin", "super-admin"]), createTeacher)
  .patch(authinticate, authorize(["admin", "super-admin"]), updateTeacher);

export default router;
