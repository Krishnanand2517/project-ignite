import { Router } from "express";
import {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourseDetails,
  updateCourseImage,
  deleteCourse,
} from "../controllers/course.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getAllCourses);
router.route("/:slug").get(getCourse);

// PROTECTED ROUTES - authorization required
router.route("/create").post(
  verifyJWT,
  upload.fields([
    {
      name: "courseImage",
      maxCount: 1,
    },
  ]),
  createCourse
);

router.route("/update-details/:slug").post(verifyJWT, updateCourseDetails);

router.route("/update-image/:slug").post(
  verifyJWT,
  upload.fields([
    {
      name: "courseImage",
      maxCount: 1,
    },
  ]),
  updateCourseImage
);

router.route("/delete/:slug").delete(verifyJWT, deleteCourse);

export default router;
