import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Loader, ContentCard, Button } from "../components";
import courseService from "../services/courses";
import contentService from "../services/contents";
import instructorService from "../services/instructors";

const Course = () => {
  const { slug } = useParams();
  const accountType = useSelector((state) => state.auth.userData?.accountType);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseImage, setCourseImage] = useState("");
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

        setCourseTitle(courseResponse.courseName);
        setCourseImage(courseResponse.courseImage);

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
        console.log("Error fetching contents:", error);
      }
    };

    fetchData();
  }, [slug, accountType]);

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
      <img
        src={courseImage}
        alt={courseTitle}
        className="my-4 mx-auto max-w-xs max-h-80 lg:max-w-lg 2xl:max-w-2xl rounded-md"
      />

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

      {isOwner && (
        <div className="mt-12">
          <Button
            textSize="text-sm 2xl:text-lg"
            className="font-bold"
            onClick={() => navigate(`/add-content/${slug}`)}
          >
            Add Content
          </Button>
        </div>
      )}
    </div>
  );
};

export default Course;
