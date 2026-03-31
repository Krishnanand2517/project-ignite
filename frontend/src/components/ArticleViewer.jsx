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
        const data = await articleService.getContent(link);
        setMdContent(data);
        setIsLoading(false);
      } catch (error) {
        console.log("Couldn't fetch file:", error);
      }
    };
    fetchData();
  }, [link]);

  if (isLoading) return <Loader />;

  return (
    <div data-color-mode="dark">
      <MDEditor.Markdown
        source={mdContent}
        className="!bg-transparent !text-[#a8a89e] whitespace-pre-wrap font-mono text-sm leading-relaxed"
        style={{ background: "transparent" }}
      />
    </div>
  );
};

export default ArticleViewer;
