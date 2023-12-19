import { Router } from "express";
import {
  getAllCourses,
  getCourse,
  createCourse,
} from "../controllers/course.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getAllCourses);
router.route("/:id").get(getCourse);

// PROTECTED ROUTES - authorization required
router
  .route("/create")
  .post(
    verifyJWT,
    upload.fields([{ name: "courseImage", maxCount: 1 }]),
    createCourse
  );

export default router;
