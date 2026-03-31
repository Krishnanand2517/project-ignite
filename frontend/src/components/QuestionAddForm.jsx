import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Input } from "./index";
import questionService from "../services/questions";
import { topicsList, companiesListInitial } from "../constants";

const topicsOptions = topicsList.map((t) => ({
  value: t,
  label: t
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" "),
}));
const companiesOptions = companiesListInitial.map((c) => ({
  value: c,
  label: c,
}));

const selectStyles = {
  control: (base, state) => ({
    ...base,
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${
      state.isFocused ? "#f59e0b" : "rgba(255,255,255,0.08)"
    }`,
    borderRadius: "8px",
    boxShadow: "none",
    "&:hover": { borderColor: "rgba(255,255,255,0.14)" },
    padding: "2px 4px",
  }),
  menu: (base) => ({
    ...base,
    background: "#17171b",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "8px",
    overflow: "hidden",
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? "rgba(245,158,11,0.1)" : "transparent",
    color: state.isFocused ? "#f59e0b" : "#a8a89e",
    fontSize: "12px",
    fontFamily: "'DM Mono', monospace",
    cursor: "pointer",
  }),
  multiValue: (base) => ({
    ...base,
    background: "rgba(245,158,11,0.12)",
    borderRadius: "99px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#f59e0b",
    fontSize: "11px",
    fontFamily: "'DM Mono', monospace",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#f59e0b",
    "&:hover": { background: "rgba(245,158,11,0.2)", color: "#f59e0b" },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#5a5a54",
    fontSize: "13px",
    fontFamily: "'DM Mono', monospace",
  }),
  input: (base) => ({
    ...base,
    color: "#f5f5f0",
    fontSize: "13px",
    fontFamily: "'DM Mono', monospace",
  }),
};

const QuestionAddForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [topics, setTopics] = useState([]);
  const [problemLink, setProblemLink] = useState("");
  const [solutionLink, setSolutionLink] = useState("");
  const [companyTags, setCompanyTags] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await questionService.addOne({
      questionTitle: title,
      difficulty,
      topics: topics.map((t) => t.value),
      problemLink,
      solutionLink,
      companyTags: companyTags.map((t) => t.value),
    });
    setIsLoading(false);
    if (response.statusCode === 201) navigate("/questions");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="mb-8">
        <span className="section-line mb-4" />
        <h2 className="font-syne font-bold text-2xl text-neutral-100 mt-4">
          Add Question
        </h2>
        <p className="text-sm font-mono text-neutral-500 mt-1">
          Contribute a DSA problem to the community
        </p>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,20,0.7)] backdrop-blur-xl p-6 space-y-4">
        <Input
          label="Problem title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />

        <select
          value={difficulty}
          onChange={({ target }) => setDifficulty(target.value)}
          className="w-full py-2.5 px-4 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-sm font-mono text-[#a8a89e] focus:border-amber-500 outline-none appearance-none cursor-pointer transition-all"
        >
          <option value="" disabled>
            Select difficulty
          </option>
          <option value="easy" className="bg-[#111114]">
            Easy
          </option>
          <option value="medium" className="bg-[#111114]">
            Medium
          </option>
          <option value="hard" className="bg-[#111114]">
            Hard
          </option>
        </select>

        <Select
          placeholder="Topics"
          isMulti
          value={topics}
          options={topicsOptions}
          onChange={setTopics}
          styles={selectStyles}
          menuPortalTarget={document.body}
          menuPosition="fixed"
        />
        <Input
          label="Problem link (e.g. LeetCode URL)"
          value={problemLink}
          onChange={({ target }) => setProblemLink(target.value)}
        />
        <Input
          label="Solution link"
          value={solutionLink}
          onChange={({ target }) => setSolutionLink(target.value)}
        />
        <CreatableSelect
          placeholder="Companies asked (select or create)"
          isMulti
          value={companyTags}
          options={companiesOptions}
          onChange={setCompanyTags}
          styles={selectStyles}
          menuPortalTarget={document.body}
          menuPosition="fixed"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !title || !difficulty || !problemLink}
        className="w-full py-3 rounded-xl font-syne font-semibold text-sm bg-accent text-black hover:bg-amber-400 hover:shadow-[0_0_24px_rgba(245,158,11,0.3)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.99]"
      >
        {isLoading ? "Adding..." : "Add Question →"}
      </button>
    </form>
  );
};

export default QuestionAddForm;
