import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import questionService from "../services/questions";
import { Button, QuestionCard, Loader } from "../components";

const Questions = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionsData = await questionService.getAll();

        const questionsObjects = questionsData.map((question) =>
          Object({
            title: question.questionTitle,
            problemLink: question.problemLink,
            solutionLink: question.solutionLink,
            topics: question.topics,
            companyTags: question.companyTags,
            difficulty: question.difficulty,
            addedBy: question.addedBy._id,
          })
        );

        setQuestions(questionsObjects);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching questions data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full pt-32 pb-4 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
        <h1 className="mb-8 text-4xl 2xl:text-6xl font-fira font-bold text-primary">
          Questions
        </h1>

        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full pt-32 pb-4 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <h1 className="mb-8 text-4xl 2xl:text-6xl font-fira font-bold text-primary">
        Questions
      </h1>

      <ul className="flex flex-col gap-y-4">
        {questions.map((question) => (
          <li key={question.title}>
            <QuestionCard
              title={question.title}
              problemLink={question.problemLink}
              solutionLink={question.solutionLink}
              topics={question.topics}
              companyTags={question.companyTags}
              difficulty={question.difficulty}
              addedById={question.addedBy}
            />
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <Button
          textSize="text-sm 2xl:text-lg"
          className="font-bold"
          onClick={() => navigate("/add-question")}
        >
          Contribute Question
        </Button>
      </div>
    </div>
  );
};

export default Questions;
