import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import courseService from "../services/courses";
import instructorService from "../services/instructors";
import { Button, Loader, CourseCard } from "../components";

const Courses = () => {
  const navigate = useNavigate();
  const accountType = useSelector((state) => state.auth.userData?.accountType);

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await courseService.getAll();
        const instructorData =
          accountType === "instructor"
            ? await instructorService.getCurrent()
            : null;

        const courseObjects = coursesData.map((course) =>
          Object({
            title: course.courseName,
            slug: course.courseSlug,
            duration: course.duration,
            difficulty:
              course.difficulty[0].toUpperCase() + course.difficulty.slice(1),
            imgPath: course.courseImage,
            editable:
              course.instructor._id.toString() ===
              instructorData?.data._id.toString(),
          })
        );

        setCourses(courseObjects);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching course data:", error);
      }
    };

    fetchData();
  }, [accountType]);

  const deleteCourse = async (slug) => {
    try {
      setCourses(courses.filter((course) => course.slug !== slug));
      await courseService.deleteOne(slug);
    } catch (error) {
      console.log("Error deleting the article:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen line-numbers pt-32 2xl:pt-40 pb-4 2xl:pb-6 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
        <h1 className="mb-16 2xl:mb-20 text-4xl 2xl:text-6xl font-fira font-bold text-primary">
          Courses
        </h1>

        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen line-numbers pt-32 2xl:pt-40 pb-4 2xl:pb-6 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <h1 className="mb-16 2xl:mb-20 text-4xl 2xl:text-6xl font-fira font-bold text-primary">
        Courses
      </h1>

      <ul className="flex flex-wrap gap-8 2xl:gap-14">
        {courses.map((course) => (
          <li key={course.slug}>
            <CourseCard deleteCourse={deleteCourse} {...course} />
          </li>
        ))}
      </ul>

      {accountType === "instructor" && (
        <div className="mt-12 2xl:mt-24">
          <Button
            textSize="text-sm 2xl:text-lg"
            className="font-bold 2xl:font-black 2xl:px-12"
            onClick={() => navigate("/add-course")}
          >
            Create Course
          </Button>
        </div>
      )}
    </div>
  );
};

export default Courses;
