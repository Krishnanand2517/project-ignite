import { Router } from "express";
import {
  getAllCourses,
  getCourse,
  createCourse,
} from "../controllers/course.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getAllCourses);
router.route("/:id").get(getCourse);

// PROTECTED ROUTES - authorization required
router.route("/create").post(verifyJWT, createCourse);

export default router;
