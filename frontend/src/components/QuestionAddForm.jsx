import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import { Input, Button, SelectInput } from "./index";
import questionService from "../services/questions";
import { topicsList, companiesListInitial } from "../constants";

const topicsOptions = topicsList.map((topic) => ({
  value: topic,
  label: topic
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
}));

const companiesOptions = companiesListInitial.map((company) => ({
  value: company,
  label: company,
}));

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

    const newQuestionObject = {
      questionTitle: title,
      difficulty,
      topics: topics.map((topic) => topic.value),
      problemLink,
      solutionLink,
      companyTags: companyTags.map((tag) => tag.value),
    };

    setIsLoading(true);

    const response = await questionService.addOne(newQuestionObject);

    setIsLoading(false);

    if (response.statusCode === 201) {
      navigate("/questions");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-14 2xl:p-20 my-32 2xl:my-48 w-full max-w-md 2xl:max-w-2xl rounded-lg flex flex-col gap-5 2xl:gap-10 font-inconsolata mx-auto bg-black bg-opacity-20 backdrop-blur-3xl"
    >
      <h2 className="text-2xl 2xl:text-4xl font-fira font-bold text-primary text-center mb-8 2xl:mb-12">
        Add Question
      </h2>
      <div>
        <Input
          label="Problem Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <SelectInput
          value={difficulty}
          onChange={({ target }) => setDifficulty(target.value)}
          label="Difficulty"
          options={[
            { name: "Easy", value: "easy" },
            { name: "Medium", value: "medium" },
            { name: "Hard", value: "hard" },
          ]}
        />
      </div>
      <div>
        <Select
          placeholder="Topics"
          isMulti
          defaultValue={topics}
          value={topics}
          options={topicsOptions}
          onChange={(selectedOptions) => setTopics(selectedOptions)}
          classNames={{
            control: () => "py-1 2xl:py-2 px-2 2xl:px-4 2xl:text-2xl",
            option: () => "2xl:text-2xl",
            menuList: () => "2xl:text-xl",
          }}
        />
      </div>
      <div>
        <Input
          label="Problem Link"
          value={problemLink}
          onChange={({ target }) => setProblemLink(target.value)}
        />
      </div>
      <div>
        <Input
          label="Solution Link"
          value={solutionLink}
          onChange={({ target }) => setSolutionLink(target.value)}
        />
      </div>
      <div>
        <CreatableSelect
          placeholder="Companies Asked"
          isMulti
          defaultValue={companyTags}
          value={companyTags}
          options={companiesOptions}
          onChange={(selectedOptions) => setCompanyTags(selectedOptions)}
          classNames={{
            control: () => "py-1 2xl:py-2 px-2 2xl:px-4 2xl:text-2xl",
            option: () => "2xl:text-2xl",
            menuList: () => "2xl:text-xl",
          }}
        />
      </div>
      <Button
        textSize="text-lg 2xl:text-2xl"
        className={`font-bold 2xl:font-black my-5 2xl:my-8 py-3 2xl:py-6 ${
          isLoading && "bg-green-800 hover:bg-green-800"
        }`}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Question"}
      </Button>
    </form>
  );
};

export default QuestionAddForm;
