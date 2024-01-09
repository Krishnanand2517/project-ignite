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
            id: question._id,
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

  const deleteQuestion = async (id) => {
    try {
      const response = await questionService.deleteOne(id);

      if (response.statusCode === 200) {
        setQuestions(questions.filter((question) => question.id !== id));
      }
    } catch (error) {
      console.log("Error deleting the question:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen pt-32 2xl:pt-40 pb-4 2xl:pb-6 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
        <h1 className="mb-8 2xl:mb-16 text-4xl 2xl:text-6xl font-fira font-bold text-primary">
          Questions
        </h1>

        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-32 2xl:pt-40 pb-4 2xl:pb-6 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <h1 className="mb-8 2xl:mb-16 text-4xl 2xl:text-6xl font-fira font-bold text-primary">
        Questions
      </h1>

      <ul className="flex flex-col gap-y-4 2xl:gap-y-6">
        {questions.map((question) => (
          <li key={question.title}>
            <QuestionCard
              id={question.id}
              title={question.title}
              problemLink={question.problemLink}
              solutionLink={question.solutionLink}
              topics={question.topics}
              companyTags={question.companyTags}
              difficulty={question.difficulty}
              addedById={question.addedBy}
              deleteQuestion={deleteQuestion}
            />
          </li>
        ))}
      </ul>

      <div className="mt-12 2xl:mt-16">
        <Button
          textSize="text-sm 2xl:text-lg"
          className="font-black"
          onClick={() => navigate("/add-question")}
        >
          Contribute Question
        </Button>
      </div>
    </div>
  );
};

export default Questions;
