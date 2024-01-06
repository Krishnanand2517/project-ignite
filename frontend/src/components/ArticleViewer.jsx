import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import articleService from "../services/articles";
import { Loader } from "./index";

const ArticleViewer = ({ link }) => {
  const [mdContent, setMdContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const articleContentData = await articleService.getContent(link);
        setIsLoading(false);
        setMdContent(articleContentData);
      } catch (error) {
        console.log("Couldn't fetch file:", error);
      }
    };

    fetchData();
  }, [link]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <MDEditor.Markdown
        source={mdContent}
        className="whitespace-pre-wrap px-6 bg-transparent text-lg 2xl:text-2xl text-primary md-viewer"
      />
    </div>
  );
};

export default ArticleViewer;
