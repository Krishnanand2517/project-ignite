import { lazy, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader, VideoPlayer } from "../components";
import contentService from "../services/contents";

const ArticleViewer = lazy(() => import("../components/ArticleViewer"));

const Content = () => {
  const { courseSlug, id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [contentObject, setContentObject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await contentService.getOne(id);
        setContentObject(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching content:", error);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#0a0a0b] pt-24 flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0a0b] pt-24">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-mono text-neutral-600 hover:text-[#a8a89e] transition-colors duration-200 mb-8 group"
        >
          <span className="transform group-hover:-translate-x-0.5 transition-transform duration-200">
            ←
          </span>
          Back to course
        </button>

        <h1 className="font-syne font-bold text-2xl text-neutral-100 mb-8 leading-snug">
          {contentObject.contentTitle}
        </h1>

        <div className="border-t border-[rgba(255,255,255,0.06)] mb-8" />

        {contentObject.contentType === "article" ? (
          <div className="font-mono text-[#a8a89e] text-sm leading-relaxed">
            <ArticleViewer link={contentObject.contentUrl} />
          </div>
        ) : (
          <VideoPlayer contentObject={contentObject} />
        )}
      </div>
    </div>
  );
};

export default Content;
