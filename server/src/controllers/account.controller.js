import asyncHandler from "../utils/asyncHandler.js";

const registerAccount = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Account registered!",
  });
});

export { registerAccount };
