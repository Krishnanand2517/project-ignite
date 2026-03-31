import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CourseAddForm } from "../components";

const CourseAdd = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] pt-24">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <CourseAddForm />
      </div>
    </div>
  );
};

export default CourseAdd;
