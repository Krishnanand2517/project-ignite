import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";

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
import ProjectCategory from "./pages/ProjectCategory.jsx";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
