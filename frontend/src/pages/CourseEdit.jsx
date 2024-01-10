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
    <div className="w-full min-h-screen pt-36 2xl:pt-40 pb-16 2xl:pb-24 px-20 2xl:px-28 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <CourseEditForm slug={slug} />
    </div>
  );
};

export default CourseEdit;
