import { useState } from "react";
import { useNavigate } from "react-router-dom";
import courseService from "../services/courses";
import { Input, ImageInput } from "./index";

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
    const formData = new FormData();
    formData.append("courseName", courseName);
    formData.append("courseSlug", courseSlug);
    formData.append("duration", Number(courseDuration) + " months");
    formData.append("category", courseCategory);
    formData.append("difficulty", courseDifficulty);
    formData.append("courseImage", courseImage);
    setIsLoading(true);
    try {
      const response = await courseService.createOne(formData);
      if (response.statusCode === 201) navigate("/courses");
    } catch (error) {
      console.log("Error creating course:", error);
      setIsLoading(false);
    }
  };

  const disabled =
    isLoading ||
    [courseName, courseSlug, courseCategory, courseDifficulty].some(
      (f) => !f?.trim()
    );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="mb-8">
        <span className="section-line mb-4" />
        <h2 className="font-syne font-bold text-2xl text-neutral-100 mt-4">
          Create Course
        </h2>
        <p className="text-sm font-mono text-neutral-500 mt-1">
          Share your knowledge as a structured course
        </p>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,20,0.7)] backdrop-blur-xl p-6 space-y-4">
        <ImageInput
          label="Course cover image"
          defaultSrc="/article_placeholder.png"
          className="text-primary"
          size="w-full"
          padding="p-2"
          rounded="rounded-xl"
          setOutputImage={setCourseImage}
          isSquare={false}
        />
        <Input
          label="Course name"
          value={courseName}
          onChange={({ target }) => setCourseName(target.value)}
        />
        <Input
          label="Slug (URL-friendly, e.g. intro-to-react)"
          value={courseSlug}
          onChange={({ target }) => setCourseSlug(target.value)}
        />
        <Input
          type="number"
          label="Duration (months)"
          value={courseDuration}
          onChange={({ target }) => setCourseDuration(target.value)}
        />

        <select
          value={courseCategory}
          onChange={({ target }) => setCourseCategory(target.value)}
          className="w-full py-2.5 px-4 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-sm font-mono text-[#a8a89e] focus:border-amber-500 outline-none appearance-none cursor-pointer transition-all"
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="Programming" className="bg-[#111114]">
            Programming
          </option>
          <option value="Future Technology" className="bg-[#111114]">
            Future Technology
          </option>
          <option value="Foundational Theory" className="bg-[#111114]">
            Foundational Theory
          </option>
        </select>

        <select
          value={courseDifficulty}
          onChange={({ target }) => setCourseDifficulty(target.value)}
          className="w-full py-2.5 px-4 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-sm font-mono text-[#a8a89e] focus:border-amber-500 outline-none appearance-none cursor-pointer transition-all"
        >
          <option value="" disabled>
            Select difficulty
          </option>
          <option value="beginner" className="bg-[#111114]">
            Beginner
          </option>
          <option value="intermediate" className="bg-[#111114]">
            Intermediate
          </option>
          <option value="expert" className="bg-[#111114]">
            Expert
          </option>
        </select>
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="w-full py-3 rounded-xl font-syne font-semibold text-sm bg-accent text-black hover:bg-amber-400 hover:shadow-[0_0_24px_rgba(245,158,11,0.3)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.99]"
      >
        {isLoading ? "Creating..." : "Create Course →"}
      </button>
    </form>
  );
};

export default CourseAddForm;
