import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ArticleAddForm } from "../components";
import { useEffect } from "react";

const ArticleAdd = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-full min-h-screen pt-36 pb-16 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <ArticleAddForm />
    </div>
  );
};

export default ArticleAdd;
