import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { ArticleEditForm } from "../components";
import { useEffect } from "react";

const ArticleEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-full min-h-screen pt-36 2xl:pt-40 pb-16 2xl:pb-24 px-20 2xl:px-28 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <ArticleEditForm id={id} />
    </div>
  );
};

export default ArticleEdit;
