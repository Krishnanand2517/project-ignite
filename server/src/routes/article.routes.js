import { Router } from "express";
import {
  createArticle,
  getArticle,
} from "../controllers/article.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/:slug").get(getArticle);

// PROTECTED ROUTES - authorization required
router.route("/create").post(
  verifyJWT,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "content", maxCount: 1 },
  ]),
  createArticle
);

export default router;
