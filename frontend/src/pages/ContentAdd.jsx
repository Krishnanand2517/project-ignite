import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { ContentAddForm } from "../components";

const ContentAdd = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-full min-h-screen pt-36 pb-16 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <ContentAddForm slug={slug} />
    </div>
  );
};

export default ContentAdd;
