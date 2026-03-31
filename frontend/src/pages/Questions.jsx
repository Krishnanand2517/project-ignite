import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import questionService from "../services/questions";
import { QuestionCard, Loader } from "../components";

const Questions = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionsData = await questionService.getAll();
        const questionsObjects = questionsData.map((question) => ({
          id: question._id,
          title: question.questionTitle,
          problemLink: question.problemLink,
          solutionLink: question.solutionLink,
          topics: question.topics,
          companyTags: question.companyTags,
          difficulty: question.difficulty,
          addedBy: question.addedBy._id,
        }));
        setQuestions(questionsObjects);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching questions:", error);
      }
    };
    fetchData();
  }, []);

  const deleteQuestion = async (id) => {
    try {
      const response = await questionService.deleteOne(id);
      if (response.statusCode === 200) {
        setQuestions(questions.filter((q) => q.id !== id));
      }
    } catch (error) {
      console.log("Error deleting question:", error);
    }
  };

  const filtered =
    filter === "all"
      ? questions
      : questions.filter((q) => q.difficulty?.toLowerCase() === filter);

  return (
    <div className="min-h-screen bg-[#0a0a0b] pt-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="section-line mb-4" />
            <h1 className="font-syne font-bold text-3xl text-neutral-100 mt-4">
              DSA Questions
            </h1>
            {!loading && (
              <p className="text-sm font-mono text-neutral-500 mt-1">
                {filtered.length} problems
              </p>
            )}
          </div>
          <button
            onClick={() => navigate("/add-question")}
            className="font-syne font-semibold text-sm px-5 py-2.5 rounded-xl bg-accent text-black hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-200 active:scale-[0.98]"
          >
            + Add question
          </button>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 mb-8">
          {["all", "easy", "medium", "hard"].map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`text-xs font-mono px-4 py-1.5 rounded-full border transition-all duration-200 capitalize ${
                filter === d
                  ? d === "easy"
                    ? "border-emerald-500 bg-[rgba(16,185,129,0.1)] text-emerald-400"
                    : d === "medium"
                    ? "border-amber-500 bg-[rgba(245,158,11,0.1)] text-amber-400"
                    : d === "hard"
                    ? "border-red-500 bg-[rgba(239,68,68,0.1)] text-red-400"
                    : "border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.06)] text-neutral-100"
                  : "border-[rgba(255,255,255,0.06)] text-neutral-500 hover:border-[rgba(255,255,255,0.12)] hover:text-[#a8a89e]"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {loading ? (
          <Loader />
        ) : (
          <ul className="flex flex-col gap-3">
            {filtered.map((question) => (
              <li key={question.id}>
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
        )}
      </div>
    </div>
  );
};

export default Questions;
