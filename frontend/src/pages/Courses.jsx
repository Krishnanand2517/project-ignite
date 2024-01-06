import { useEffect, useState } from "react";
import courseService from "../services/courses";
import { Loader, CourseCard } from "../components";

const Courses = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await courseService.getAll();

        const courseObjects = coursesData.map((course) =>
          Object({
            title: course.courseName,
            slug: course.courseSlug,
            duration: course.duration,
            difficulty:
              course.difficulty[0].toUpperCase() + course.difficulty.slice(1),
            imgPath: course.courseImage,
          })
        );

        setCourses(courseObjects);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching course data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full line-numbers pt-32 pb-4 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
        <h1 className="mb-16 text-4xl 2xl:text-6xl font-fira font-bold text-primary">
          Courses
        </h1>

        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full line-numbers pt-32 pb-4 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <h1 className="mb-16 text-4xl 2xl:text-6xl font-fira font-bold text-primary">
        Courses
      </h1>

      <ul className="flex flex-wrap gap-8">
        {courses.map((course) => (
          <li key={course.slug}>
            <CourseCard {...course} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
