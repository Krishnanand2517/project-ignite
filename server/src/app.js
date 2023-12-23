import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// ROUTES
import accountRouter from "./routes/account.routes.js";
import courseRouter from "./routes/course.routes.js";
import questionRouter from "./routes/question.routes.js";

app.use("/api/v1/accounts", accountRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/questions", questionRouter);

export default app;
