import { useState } from "react";
import { useNavigate } from "react-router-dom";

import courseService from "../services/courses";
import { Input, SelectInput, Button, ArticleEditor } from "./index";

const ContentAddForm = ({ slug }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [contentTitle, setContentTitle] = useState("");
  const [contentType, setContentType] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [mdContent, setMdContent] = useState("### Write your article here...");

  const makeArticleFile = (contents) => {
    const dataBlob = new Blob([contents], { type: "text/plain" });
    const file = new File([dataBlob], "output.md", {
      type: "text/markdown",
    });
    return file;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const contentFile =
      contentType === "article" ? makeArticleFile(mdContent) : null;

    const contentFormData = new FormData();
    contentFormData.append("contentTitle", contentTitle);
    contentFormData.append("contentType", contentType);

    if (contentType === "article") {
      contentFormData.append("content", contentFile);
    } else if (contentType === "video") {
      contentFormData.append("content", videoUrl);
    }

    setIsLoading(true);

    try {
      const response = await courseService.addContent(slug, contentFormData);

      if (response.statusCode === 201) {
        navigate(`/courses/${slug}`);
      }
    } catch (error) {
      console.log("Error while adding content:", error);
      setIsLoading(false);
    }
  };

  const renderContentInputFields = () => {
    switch (contentType) {
      case "article":
        return (
          <ArticleEditor mdContent={mdContent} setMdContent={setMdContent} />
        );

      case "video":
        return (
          <>
            <span className="text-lg 2xl:text-2xl text-primary">
              Upload Video
            </span>
            <Input
              type="file"
              className="text-primary"
              onChange={({ target }) => setVideoUrl(target.files[0])}
              accept="video/mp4, video/mkv"
            />
          </>
        );

      default:
        break;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-14 2xl:p-20 flex flex-col gap-y-5 2xl:gap-y-10 font-inconsolata"
    >
      <h2 className="text-2xl 2xl:text-4xl font-fira font-bold text-primary text-center mb-8 2xl:mb-12">
        Add Content
      </h2>

      <div>
        <Input
          label="Content Title"
          value={contentTitle}
          onChange={({ target }) => setContentTitle(target.value)}
        />
      </div>
      <div>
        <SelectInput
          value={contentType}
          onChange={({ target }) => setContentType(target.value)}
          label="Content Type"
          options={[
            { name: "Article", value: "article" },
            { name: "Video", value: "video" },
            // { name: "Exercise", value: "exercise" },
          ]}
        />
      </div>

      <div>{contentType && renderContentInputFields()}</div>

      <Button
        textSize="text-lg 2xl:text-2xl"
        className={`font-bold 2xl:font-black my-8 2xl:my-12 py-3 2xl:py-6 ${
          (isLoading ||
            [contentTitle, contentType].some(
              (field) => field?.toString().trim() === ""
            ) ||
            (!videoUrl && !mdContent)) &&
          "bg-green-800 hover:bg-green-800"
        }`}
        type="submit"
        disabled={
          isLoading ||
          [contentTitle, contentType].some(
            (field) => field?.toString().trim() === ""
          ) ||
          (!videoUrl && !mdContent)
        }
      >
        {isLoading ? "Adding..." : "Add Content"}
      </Button>
    </form>
  );
};

export default ContentAddForm;
