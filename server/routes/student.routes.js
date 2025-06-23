import { Router } from "express";

import {
  // createStudent,
  // getAllStudents,
  getStudentsPage,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";

// Middlewares
import authinticate from "../middlewares/authintication.middleware.js";
import authorize from "../middlewares/authorization.middleware.js";

// Validators
import {
  validateObjectId,
  validateStudentId,
  validateStudentUpdateData,
  validateUniversityId,
} from "../middlewares/validation.middleware.js";

const router = Router();

router.route("/").get(getStudentsPage);

router
  .route("/:universityId")
  // .post(validateUniversityId, authorize(["admin"]), createStudent);

// router.route("/all").get(getAllStudents);

router
  .route("/:id")
  .get(validateObjectId, authinticate, getStudentById)
  .patch(
    authorize(["Admin"]),
    validateObjectId,
    validateStudentUpdateData,
    updateStudent
  )
  .delete(authinticate, authorize(["admin"]), deleteStudent);

export default router;
