import { Router } from "express";
import { getAllTeachers, getPageOfTeachers } from "../controllers/teacher.controller.js";
const router = Router();

router.route("/all").get(getAllTeachers);

router.route("/").get(getPageOfTeachers);

export default router;
