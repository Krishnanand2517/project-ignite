import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ArticleViewer, Loader, VideoPlayer } from "../components";
import contentService from "../services/contents";

const Content = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [contentObject, setContentObject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await contentService.getOne(id);
        setContentObject(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching content data:", error);
      }
    };

    fetchData();
  }, [id]);

  const renderArticleContent = () => {
    return (
      <div className="w-full 2xl:text-xl">
        <ArticleViewer link={contentObject.contentUrl} />
      </div>
    );
  };

  const renderVideoContent = () => {
    return <VideoPlayer contentObject={contentObject} />;
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen line-numbers pt-32 pb-4 px-48 bg-gradient-to-b from-primary via-slate-800 to-secondary">
        <h1 className="mt-32 mb-4 text-5xl 2xl:text-7xl text-center font-bold text-primary">
          Loading
        </h1>

        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen line-numbers pt-32 pb-4 px-48 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <h1 className="mt-8 mb-16 text-4xl 2xl:text-6xl text-center font-bold text-primary">
        {contentObject.contentTitle}
      </h1>

      {/* TODO: RenderVideoContent */}
      {contentObject.contentType === "article"
        ? renderArticleContent()
        : renderVideoContent()}
    </div>
  );
};

export default Content;
