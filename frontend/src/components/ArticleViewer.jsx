import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import articleService from "../services/articles";

const ArticleViewer = ({ link }) => {
  const [mdContent, setMdContent] = useState("File not loaded");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleContentData = await articleService.getContent(link);
        setMdContent(articleContentData);
      } catch (error) {
        console.log("Couldn't fetch file:", error);
      }
    };

    fetchData();
  }, [link]);

  return (
    <div>
      <MDEditor.Markdown
        source={mdContent}
        className="whitespace-pre-wrap bg-transparent font-inconsolata 2xl:text-xl"
      />
    </div>
  );
};

export default ArticleViewer;
