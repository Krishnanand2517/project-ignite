import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { withSuspense } from "../hooks/suspense.jsx";
import {
  Article,
  ArticleAdd,
  ArticleEdit,
  Articles,
  Content,
  ContentAdd,
  Course,
  CourseAdd,
  CourseEdit,
  Courses,
  Landing,
  Login,
  ProjectCategory,
  Projects,
  QuestionAdd,
  QuestionEdit,
  Questions,
  Register,
} from "../pages";

const App = lazy(() => import("../App.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(App),
    children: [
      {
        index: true,
        element: withSuspense(Landing),
      },
      {
        path: "login",
        element: withSuspense(Login),
      },
      {
        path: "register",
        element: withSuspense(Register),
      },
      {
        path: "articles",
        element: withSuspense(Articles),
      },
      {
        path: "articles/:slug",
        element: withSuspense(Article),
      },
      {
        path: "add-article",
        element: withSuspense(ArticleAdd),
      },
      {
        path: "edit-article/:id",
        element: withSuspense(ArticleEdit),
      },
      {
        path: "courses",
        element: withSuspense(Courses),
      },
      {
        path: "courses/:slug",
        element: withSuspense(Course),
      },
      {
        path: "add-course",
        element: withSuspense(CourseAdd),
      },
      {
        path: "edit-course/:slug",
        element: withSuspense(CourseEdit),
      },
      {
        path: "courses/:courseSlug/:id",
        element: withSuspense(Content),
      },
      {
        path: "add-content/:slug",
        element: withSuspense(ContentAdd),
      },
      {
        path: "projects",
        element: withSuspense(Projects),
      },
      {
        path: "projects/:slug",
        element: withSuspense(ProjectCategory),
      },
      {
        path: "questions",
        element: withSuspense(Questions),
      },
      {
        path: "add-question",
        element: withSuspense(QuestionAdd),
      },
      {
        path: "edit-question/:id",
        element: withSuspense(QuestionEdit),
      },
    ],
  },
]);

export default router;
