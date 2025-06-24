import { Router } from "express";

import {
  createUniversity,
  // getAllUniversities,
  getStudentsPageOfUniversity,
  getUniversitiesPage,
  getUniversityById,
  getTeachersPageOfUniversity,
} from "../controllers/university.controller.js";
import { validateUniversityId } from "../middlewares/validation.middleware.js";
import authinticate from "../middlewares/authintication.middleware.js";

const router = Router();

router.route("/").get(getUniversitiesPage).post(createUniversity);

router.route("/:universityId").get(getUniversityById);

router
  .route("/:universityId/students")
  .get(validateUniversityId, authinticate, getStudentsPageOfUniversity);

router.route("/:universityId/teachers").get(getTeachersPageOfUniversity);

export default router;
