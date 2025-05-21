import { Router } from "express";

import {
  createUniversity,
  getAllUniversities,
  getStudentsPageOfUniversity,
  getUniversitiesPage,
  getUniversityById,
  getTeachersPageOfUniversity,
} from "../controllers/university.controller.js";
import { validateUniversityId } from "../middlewares/validation.middleware.js";

const router = Router();

router.route("/").get(getUniversitiesPage).post(createUniversity);

router.route("/all").get(getAllUniversities);

router.route("/:universityId").get(getUniversityById);

router
  .route("/:universityId/students")
  .get(validateUniversityId, getStudentsPageOfUniversity);

router.route("/:universityId/teachers").get(getTeachersPageOfUniversity);

export default router;
