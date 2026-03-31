import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import courseService from "../services/courses";
import { Input } from "./index";

const CourseEditForm = () => {
  const { slug } = useParams();
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
        console.log("Error fetching course:", error);
      }
    };
    fetchData();
  }, [slug]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await courseService.updateOne(slug, {
        courseName,
        courseSlug,
        duration: courseDuration.toString() + " months",
        category: courseCategory,
        difficulty: courseDifficulty,
      });
      if (response.statusCode === 200) navigate("/courses");
    } catch (error) {
      console.log("Error updating course:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const disabled =
    isLoading ||
    [courseName, courseSlug, courseCategory, courseDifficulty].some(
      (f) => !f?.toString().trim()
    );

  const selectCls =
    "w-full py-2.5 px-4 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-sm font-mono text-[#a8a89e] focus:border-amber-500 outline-none appearance-none cursor-pointer transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="mb-8">
        <span className="section-line mb-4" />
        <h2 className="font-syne font-bold text-2xl text-neutral-100 mt-4">
          Edit Course
        </h2>
      </div>
      <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,20,0.7)] backdrop-blur-xl p-6 space-y-4">
        <Input
          label="Course name"
          value={courseName}
          onChange={({ target }) => setCourseName(target.value)}
        />
        <Input
          label="Slug"
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
          className={selectCls}
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
          className={selectCls}
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
        {isLoading ? "Saving..." : "Save Changes →"}
      </button>
    </form>
  );
};

export default CourseEditForm;
