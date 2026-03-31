import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader, ContentCard } from "../components";
import courseService from "../services/courses";
import contentService from "../services/contents";
import instructorService from "../services/instructors";

const Course = () => {
  const { slug } = useParams();
  const accountType = useSelector((state) => state.auth.userData?.accountType);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const [courseContents, setCourseContents] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await courseService.getOne(slug);
        const instructorData =
          accountType === "instructor"
            ? await instructorService.getCurrent()
            : null;
        setCourseData(courseResponse);
        const contentResponse = await contentService.getAllFromCourse(
          courseResponse._id
        );
        setCourseContents(contentResponse.data);
        if (
          courseResponse.instructor._id.toString() ===
          instructorData?.data._id.toString()
        ) {
          setIsOwner(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching course:", error);
      }
    };
    fetchData();
  }, [slug, accountType]);

  const deleteContent = async (id) => {
    try {
      setCourseContents(courseContents.filter((c) => c._id !== id));
      await contentService.deleteOne(id);
    } catch (error) {
      console.log("Error deleting content:", error);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#0a0a0b] pt-24 flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0a0b] pt-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Course header */}
        <div className="flex flex-col sm:flex-row gap-7 mb-12">
          <div className="w-full sm:w-48 h-32 sm:h-36 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] flex-shrink-0">
            {courseData.courseImage && (
              <img
                src={courseData.courseImage}
                alt={courseData.courseName}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col justify-center gap-3">
            <h1 className="font-syne font-bold text-3xl text-neutral-100 leading-tight">
              {courseData.courseName}
            </h1>
            <div className="flex gap-3 flex-wrap items-center">
              {courseData.duration && (
                <span className="text-xs font-mono text-neutral-400">
                  ⏱ {courseData.duration}
                </span>
              )}
              {courseData.difficulty && (
                <span className="tag">
                  {courseData.difficulty[0].toUpperCase() +
                    courseData.difficulty.slice(1)}
                </span>
              )}
              <span className="text-xs font-mono text-neutral-500">
                {courseContents.length} lessons
              </span>
            </div>
          </div>
        </div>

        {/* Content list */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-syne font-bold text-lg text-neutral-100">
            Course Content
          </h2>
          {isOwner && (
            <button
              onClick={() => navigate(`/add-content/${slug}`)}
              className="font-syne font-semibold text-xs px-4 py-2 rounded-xl bg-accent text-black hover:bg-amber-400 hover:shadow-[0_0_16px_rgba(245,158,11,0.25)] transition-all duration-200"
            >
              + Add lesson
            </button>
          )}
        </div>

        {courseContents.length === 0 ? (
          <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(17,17,20,0.4)] p-8 text-center">
            <p className="text-sm font-mono text-neutral-500">
              No lessons yet.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {courseContents.map((content, i) => (
              <div key={content._id} className="flex items-center gap-4">
                <span className="text-xs font-mono text-neutral-500 w-5 flex-shrink-0 text-right tabular-nums">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <ContentCard
                    id={content._id}
                    title={content.contentTitle}
                    courseSlug={slug}
                    editable={isOwner}
                    deleteContent={deleteContent}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;
