import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { CourseEditForm } from "../components";

const CourseEdit = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-full min-h-screen pt-36 pb-16 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <CourseEditForm slug={slug} />
    </div>
  );
};

export default CourseEdit;
