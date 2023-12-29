import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { QuestionEditForm } from "../components";
import { useEffect } from "react";

const QuestionEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-full py-4 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <QuestionEditForm id={id} />
    </div>
  );
};

export default QuestionEdit;
