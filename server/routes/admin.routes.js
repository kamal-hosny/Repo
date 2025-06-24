import { Router } from "express";
// Middlewares
import authinticate from "../middlewares/authintication.middleware.js";
import authorize from "../middlewares/authorization.middleware.js";
import { createStudent, createAdmin, updateUniversity } from "../controllers/admin.controller.js";
import {
  createTeacher,
  updateTeacher,
  updateAdmin,
  deleteAdmin,
} from "../controllers/admin.controller.js";

const router = Router();

router
  .route("/new-admin")
  .post(authinticate, authorize(["super-admin"]), createAdmin)
  .patch(authinticate, authorize(["super-admin"]), updateAdmin)
  .delete(authinticate, authorize(["super-admin"]), deleteAdmin);

router
  .route("/student")
  .post(authinticate, authorize(["admin", "super-admin"]), createStudent);
router
  .route("/teacher")
  .post(authinticate, authorize(["admin", "super-admin"]), createTeacher)
  .patch(authinticate, authorize(["admin", "super-admin"]), updateTeacher);

router.route("/university").patch(authinticate, authorize(["admin", "super-admin"]), updateUniversity)

export default router;
