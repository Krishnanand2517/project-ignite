import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Loader, ContentCard } from "../components";
import courseService from "../services/courses";
import contentService from "../services/contents";

const Course = () => {
  const { slug } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseContents, setCourseContents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await courseService.getOne(slug);
        setCourseTitle(courseResponse.courseName);

        const contentResponse = await contentService.getAllFromCourse(
          courseResponse._id
        );
        setCourseContents(contentResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching contents:", error);
      }
    };

    fetchData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen line-numbers pt-32 pb-4 px-48 bg-gradient-to-b from-primary via-slate-800 to-secondary">
        <h1 className="mb-8 text-4xl 2xl:text-6xl font-fira font-bold text-primary">
          Contents
        </h1>

        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen line-numbers pt-32 pb-4 px-48 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <h1 className="mb-16 text-4xl 2xl:text-6xl font-fira font-bold text-primary">
        {courseTitle}
      </h1>

      <h2 className="mb-6 text-2xl 2xl:text-4xl font-fira font-bold text-secondary">
        Contents
      </h2>

      <ul className="flex flex-col gap-y-8 text-primary">
        {courseContents.map((content) => (
          <li key={content._id}>
            <ContentCard content={content} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Course;
