import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { QuestionAddForm } from "../components";
import { useEffect } from "react";

const QuestionAdd = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-full py-4 2xl:py-8 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <QuestionAddForm />
    </div>
  );
};

export default QuestionAdd;
