import { Router } from "express";

import {
  createStudent,
  getAllStudents,
  getStudentsPage,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";

// Validators
import {
  validateObjectId,
  validateStudentId,
  validateStudentUpdateData,
  validateUniversityId,
} from "../middlewares/validation.middleware.js";

const router = Router();

router.route("/").get(getStudentsPage);
router.route("/:universityId").post(validateUniversityId, createStudent);

router.route("/all").get(getAllStudents);

router
  .route("/:id")
  .get(validateObjectId, getStudentById)
  .patch(validateObjectId, validateStudentUpdateData, updateStudent)
  .delete(deleteStudent);

export default router;
