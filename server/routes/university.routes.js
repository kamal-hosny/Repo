import { Router } from "express";

import { createUniversity, getAllUniversities } from "../controllers/university.controller.js";

const router = Router();

router.route("/").get(getAllUniversities).post(createUniversity);

export default router;
