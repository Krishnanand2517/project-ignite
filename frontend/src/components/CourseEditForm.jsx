import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import courseService from "../services/courses";
import { Input, Button, SelectInput } from "./index";

const CourseEditForm = ({ slug }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [courseSlug, setCourseSlug] = useState("");
  const [courseDuration, setCourseDuration] = useState(1);
  const [courseCategory, setCourseCategory] = useState("");
  const [courseDifficulty, setCourseDifficulty] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await courseService.getOne(slug);

        setCourseName(courseData.courseName);
        setCourseSlug(courseData.courseSlug);
        setCourseDuration(courseData.duration.split(" ")[0]);
        setCourseCategory(courseData.category);
        setCourseDifficulty(courseData.difficulty);
      } catch (error) {
        console.log("Error fetching course data:", error);
      }
    };

    fetchData();
  }, [slug]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCourseObject = {
      courseName,
      courseSlug,
      duration: courseDuration.toString() + " months",
      category: courseCategory,
      difficulty: courseDifficulty,
    };

    setIsLoading(true);

    try {
      const response = await courseService.updateOne(slug, newCourseObject);

      if (response.statusCode === 200) {
        navigate("/courses");
      }
    } catch (error) {
      console.log("Error while updating course:", error);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="pt-4 2xl:pt-8 px-24 pb-14 flex flex-col gap-y-5 2xl:gap-y-10 font-inconsolata"
    >
      <h2 className="text-2xl 2xl:text-4xl font-fira font-bold text-primary text-center mb-8 2xl:mb-12">
        Edit Course
      </h2>

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
        {isLoading ? "Updating..." : "Update Course"}
      </Button>
    </form>
  );
};

export default CourseEditForm;
