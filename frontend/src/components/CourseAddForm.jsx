import { useState } from "react";
import { useNavigate } from "react-router-dom";

import courseService from "../services/courses";
import { Input, ImageInput, Button, SelectInput } from "./index";

const CourseAddForm = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [courseSlug, setCourseSlug] = useState("");
  const [courseDuration, setCourseDuration] = useState(1);
  const [courseCategory, setCourseCategory] = useState("");
  const [courseDifficulty, setCourseDifficulty] = useState("");
  const [courseImage, setCourseImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const courseFormData = new FormData();
    courseFormData.append("courseName", courseName);
    courseFormData.append("courseSlug", courseSlug);
    courseFormData.append("duration", Number(courseDuration) + " months");
    courseFormData.append("category", courseCategory);
    courseFormData.append("difficulty", courseDifficulty);
    courseFormData.append("courseImage", courseImage);

    setIsLoading(true);

    try {
      const response = await courseService.createOne(courseFormData);

      if (response.statusCode === 201) {
        navigate("/courses");
      }
    } catch (error) {
      console.log("Error while creating course:", error);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="pt-4 2xl:pt-8 px-24 pb-14 flex flex-col gap-y-5 2xl:gap-y-10 font-inconsolata"
    >
      <h2 className="text-2xl 2xl:text-4xl font-fira font-bold text-primary text-center mb-8 2xl:mb-12">
        Add Course
      </h2>

      <div>
        <ImageInput
          label="Course Image"
          defaultSrc="/article_placeholder.png"
          className="text-primary my-8 2xl:my-12"
          size="w-3/5 2xl:w-1/2"
          padding="p-2"
          rounded="rounded-md"
          setOutputImage={setCourseImage}
          isSquare={false}
        />
      </div>
      <div>
        <Input
          label="Course Name"
          value={courseName}
          onChange={({ target }) => setCourseName(target.value)}
        />
      </div>
      <div>
        <Input
          label="Course Slug"
          value={courseSlug}
          onChange={({ target }) => setCourseSlug(target.value)}
        />
      </div>
      <div>
        <Input
          type="number"
          label="Course Duration (in months)"
          value={courseDuration}
          onChange={({ target }) => setCourseDuration(target.value)}
        />
      </div>
      <div>
        <SelectInput
          value={courseCategory}
          onChange={({ target }) => setCourseCategory(target.value)}
          label="Category"
          options={[
            { name: "Programming", value: "Programming" },
            { name: "Future Technology", value: "Future Technology" },
            { name: "Foundational Theory", value: "Foundational Theory" },
          ]}
        />
      </div>
      <div>
        <SelectInput
          value={courseDifficulty}
          onChange={({ target }) => setCourseDifficulty(target.value)}
          label="Difficulty"
          options={[
            { name: "Beginner", value: "beginner" },
            { name: "Intermediate", value: "intermediate" },
            { name: "Expert", value: "expert" },
          ]}
        />
      </div>

      <Button
        textSize="text-lg 2xl:text-2xl"
        className={`font-bold 2xl:font-black my-8 2xl:my-12 py-3 2xl:py-6 ${
          (isLoading ||
            [
              courseName,
              courseSlug,
              courseCategory,
              courseDifficulty,
              courseDuration,
            ].some((field) => field?.toString().trim() === "")) &&
          "bg-green-800 hover:bg-green-800"
        }`}
        type="submit"
        disabled={
          isLoading ||
          [
            courseName,
            courseSlug,
            courseCategory,
            courseDifficulty,
            courseDuration,
          ].some((field) => field?.toString().trim() === "")
        }
      >
        {isLoading ? "Creating..." : "Create Course"}
      </Button>
    </form>
  );
};

export default CourseAddForm;
