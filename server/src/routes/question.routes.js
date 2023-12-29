import { Router } from "express";
import {
  addQuestion,
  deleteQuestion,
  editQuestion,
  getAllQuestions,
  getQuestion,
} from "../controllers/question.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getAllQuestions);
router.route("/:id").get(getQuestion);

// PROTECTED ROUTES - authorization required
router.route("/add").post(verifyJWT, addQuestion);
router.route("/edit/:id").post(verifyJWT, editQuestion);
router.route("/delete/:id").delete(verifyJWT, deleteQuestion);

export default router;
