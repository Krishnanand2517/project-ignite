import { QuestionCard } from "../components";

const Questions = () => {
  const questions = [
    {
      title: "Subarray with given sum",
      slug: "subarray-with-given-sum",
      difficulty: "Easy",
    },
    {
      title: "Kadane's Algorithm",
      slug: "kadanes-algorithm",
      difficulty: "Medium",
    },
    {
      title: "Longest valid parentheses",
      slug: "longest-valid-parentheses",
      difficulty: "Hard",
    },
    {
      title: "Max circular subarray sum",
      slug: "max-circular-subarray-sum",
      difficulty: "Hard",
    },
  ];

  return (
    <div className="w-full pt-32 pb-4 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <h1 className="mb-8 text-4xl 2xl:text-6xl font-fira font-bold text-primary">
        Questions
      </h1>

      <ul className="flex flex-col gap-y-4">
        {questions.map((question) => (
          <li key={question.title}>
            <QuestionCard
              slug={question.slug}
              title={question.title}
              difficulty={question.difficulty}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
