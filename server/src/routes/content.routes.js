import { Router } from "express";
import {
  deleteContent,
  editContentTitle,
  getAllContents,
  getContent,
} from "../controllers/content.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getAllContents);
router.route("/:id").get(getContent);

// PROTECTED ROUTES - authorization required
router.route("/edit-content-title/:id").post(verifyJWT, editContentTitle);
router.route("/delete-content/:id").delete(verifyJWT, deleteContent);

export default router;
