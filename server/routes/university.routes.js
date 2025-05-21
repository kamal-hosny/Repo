import { Router } from "express";

import {
  createUniversity,
  getAllUniversities,
  getStudentsPageOfUniversity,
  getUniversitiesPage,
  getUniversityById,
} from "../controllers/university.controller.js";
import validateMongoId from "../middlewares/validateMongoId.middleware.js";

const router = Router();

router.route("/").get(getUniversitiesPage).post(createUniversity);

router.route("/all").get(getAllUniversities);

router.route("/:universityId").get(getUniversityById);

router
  .route("/:universityId/students")
  .get(validateMongoId, getStudentsPageOfUniversity);

export default router;
