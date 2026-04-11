import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "articles",
        element: <Articles />,
      },
      {
        path: "articles/:slug",
        element: <Article />,
      },
      {
        path: "add-article",
        element: <ArticleAdd />,
      },
      {
        path: "edit-article/:id",
        element: <ArticleEdit />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "courses/:slug",
        element: <Course />,
      },
      {
        path: "add-course",
        element: <CourseAdd />,
      },
      {
        path: "edit-course/:slug",
        element: <CourseEdit />,
      },
      {
        path: "courses/:courseSlug/:id",
        element: <Content />,
      },
      {
        path: "add-content/:slug",
        element: <ContentAdd />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:slug",
        element: <ProjectCategory />,
      },
      {
        path: "questions",
        element: <Questions />,
      },
      {
        path: "add-question",
        element: <QuestionAdd />,
      },
      {
        path: "edit-question/:id",
        element: <QuestionEdit />,
      },
    ],
  },
]);

export default router;
