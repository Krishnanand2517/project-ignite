import { Router } from "express";
import {
  registerAccount,
  loginAccount,
} from "../controllers/account.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerAccount
);

router.route("/login").post(loginAccount);

export default router;
