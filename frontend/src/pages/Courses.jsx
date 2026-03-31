import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import courseService from "../services/courses";
import instructorService from "../services/instructors";
import { Loader, CourseCard } from "../components";

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
        const courseObjects = coursesData.map((course) => ({
          title: course.courseName,
          slug: course.courseSlug,
          duration: course.duration,
          difficulty:
            course.difficulty[0].toUpperCase() + course.difficulty.slice(1),
          imgPath: course.courseImage,
          editable:
            course.instructor._id.toString() ===
            instructorData?.data._id.toString(),
        }));
        setCourses(courseObjects);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };
    fetchData();
  }, [accountType]);

  const deleteCourse = async (slug) => {
    try {
      setCourses(courses.filter((c) => c.slug !== slug));
      await courseService.deleteOne(slug);
    } catch (error) {
      console.log("Error deleting course:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] pt-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="section-line mb-4" />
            <h1 className="font-syne font-bold text-3xl text-neutral-100 mt-4">
              Courses
            </h1>
            {!loading && (
              <p className="text-sm font-mono text-neutral-500 mt-1">
                {courses.length} courses available
              </p>
            )}
          </div>
          {accountType === "instructor" && (
            <button
              onClick={() => navigate("/add-course")}
              className="font-syne font-semibold text-sm px-5 py-2.5 rounded-xl bg-accent text-black hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-200 active:scale-[0.98]"
            >
              + Create course
            </button>
          )}
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {courses.map((course) => (
              <CourseCard
                key={course.slug}
                deleteCourse={deleteCourse}
                {...course}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
