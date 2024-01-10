import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("Error:", err);
      throw err;
    });

    app.get("/", (_req, res) => {
      res.send("<h1>Project IGNITE</h1>");
    });

    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });
