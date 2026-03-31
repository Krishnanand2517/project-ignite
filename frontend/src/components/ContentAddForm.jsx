import { useState } from "react";
import { useNavigate } from "react-router-dom";
import courseService from "../services/courses";
import { Input, ArticleEditor } from "./index";

const ContentAddForm = ({ slug }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [contentTitle, setContentTitle] = useState("");
  const [contentType, setContentType] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [mdContent, setMdContent] = useState("### Write your lesson here...");

  const makeArticleFile = (contents) => {
    const blob = new Blob([contents], { type: "text/plain" });
    return new File([blob], "output.md", { type: "text/markdown" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("contentTitle", contentTitle);
    formData.append("contentType", contentType);
    if (contentType === "article")
      formData.append("content", makeArticleFile(mdContent));
    else if (contentType === "video") formData.append("content", videoUrl);
    setIsLoading(true);
    try {
      const response = await courseService.addContent(slug, formData);
      if (response.statusCode === 201) navigate(`/courses/${slug}`);
    } catch (error) {
      console.log("Error adding content:", error);
      setIsLoading(false);
    }
  };

  const disabled =
    isLoading ||
    !contentTitle.trim() ||
    !contentType ||
    (!videoUrl && !mdContent);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="mb-8">
        <span className="section-line mb-4" />
        <h2 className="font-syne font-bold text-2xl text-neutral-100 mt-4">
          Add Lesson
        </h2>
        <p className="text-sm font-mono text-neutral-500 mt-1">
          Add a new lesson to this course
        </p>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,20,0.7)] backdrop-blur-xl p-6 space-y-4">
        <Input
          label="Lesson title"
          value={contentTitle}
          onChange={({ target }) => setContentTitle(target.value)}
        />

        <select
          value={contentType}
          onChange={({ target }) => setContentType(target.value)}
          className="w-full py-2.5 px-4 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-sm font-mono text-[#a8a89e] focus:border-amber-500 outline-none appearance-none cursor-pointer transition-all"
        >
          <option value="" disabled>
            Select content type
          </option>
          <option value="article" className="bg-[#111114]">
            Article / Text
          </option>
          <option value="video" className="bg-[#111114]">
            Video
          </option>
        </select>
      </div>

      {contentType === "article" && (
        <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,20,0.7)] backdrop-blur-xl overflow-hidden">
          <ArticleEditor mdContent={mdContent} setMdContent={setMdContent} />
        </div>
      )}

      {contentType === "video" && (
        <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,20,0.7)] p-6 space-y-3">
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            Upload video
          </p>
          <Input
            type="file"
            className="text-[#a8a89e]"
            onChange={({ target }) => setVideoUrl(target.files[0])}
            accept="video/mp4,video/mkv"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={disabled}
        className="w-full py-3 rounded-xl font-syne font-semibold text-sm bg-accent text-black hover:bg-amber-400 hover:shadow-[0_0_24px_rgba(245,158,11,0.3)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.99]"
      >
        {isLoading ? "Adding..." : "Add Lesson →"}
      </button>
    </form>
  );
};

export default ContentAddForm;
