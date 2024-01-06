import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store.js";

import App from "./App.jsx";
import "./index.css";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Articles from "./pages/Articles.jsx";
import Courses from "./pages/Courses.jsx";
import Projects from "./pages/Projects.jsx";
import Questions from "./pages/Questions.jsx";
import Article from "./pages/Article.jsx";
import ArticleAdd from "./pages/ArticleAdd.jsx";
import ProjectCategory from "./pages/ProjectCategory.jsx";
import QuestionAdd from "./pages/QuestionAdd.jsx";
import QuestionEdit from "./pages/QuestionEdit.jsx";
import ArticleEdit from "./pages/ArticleEdit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/articles",
        element: <Articles />,
      },
      {
        path: "/articles/:slug",
        element: <Article />,
      },
      {
        path: "/add-article",
        element: <ArticleAdd />,
      },
      {
        path: "edit-article/:id",
        element: <ArticleEdit />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/projects/:slug",
        element: <ProjectCategory />,
      },
      {
        path: "/questions",
        element: <Questions />,
      },
      {
        path: "/add-question",
        element: <QuestionAdd />,
      },
      {
        path: "/edit-question/:id",
        element: <QuestionEdit />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
