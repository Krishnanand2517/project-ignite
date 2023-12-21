import { Router } from "express";
import {
  registerAccount,
  loginAccount,
  logoutAccount,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentAccount,
} from "../controllers/account.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

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

// PROTECTED ROUTES - authorization required
router.route("/logout").post(verifyJWT, logoutAccount);
router.route("/refresh-token").post(refreshAccessToken);

router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/get-account").get(verifyJWT, getCurrentAccount);

export default router;
