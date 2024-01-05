import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

import articleService from "../services/articles";
import { ArticleEditor, Input, ImageInput, Button } from "./index";
import { articleTagsList } from "../constants";

const articleTagsOptions = articleTagsList.map((tag) => ({
  value: tag,
  label: tag,
}));

const ArticleAddForm = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [articleTitle, setArticleTitle] = useState("");
  const [articleSlug, setArticleSlug] = useState("");
  const [articleTags, setArticleTags] = useState([]);
  const [coverImage, setCoverImage] = useState(null);

  const [mdContent, setMdContent] = useState("### Write your article here...");
  const [contentFile, setContentFile] = useState(null);

  const makeArticleFile = async (contents) => {
    const dataBlob = await new Blob([contents], { type: "text/plain" });
    const file = await new File([dataBlob], "output.md", {
      type: "text/markdown",
    });
    setContentFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    makeArticleFile(mdContent);

    const articleFormData = new FormData();
    articleFormData.append("articleTitle", articleTitle);
    articleFormData.append("articleSlug", articleSlug);
    articleFormData.append("coverImage", coverImage);
    articleFormData.append("content", contentFile);
    // articleFormData.append(
    //   "tags",
    //   articleTags.map((tag) => tag.value)
    // );
    articleTags.forEach((tag) => {
      articleFormData.append("tags", tag.value);
    });

    setIsLoading(true);

    try {
      const response = await articleService.createOne(articleFormData);

      if (response.statusCode === 201) {
        navigate("/articles");
      }
    } catch (error) {
      console.log("Error while adding articles:", error);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-14 flex flex-col gap-y-5 2xl:gap-y-10 font-inconsolata"
    >
      <h2 className="text-2xl 2xl:text-4xl font-fira font-bold text-primary text-center mb-8">
        Add Article
      </h2>
      <div>
        <Input
          label="Article Title"
          value={articleTitle}
          onChange={({ target }) => setArticleTitle(target.value)}
        />
      </div>
      <div>
        <Input
          label="Article Slug"
          value={articleSlug}
          onChange={({ target }) => setArticleSlug(target.value)}
        />
      </div>
      <div>
        <ImageInput
          label="Cover Image"
          defaultSrc="/article_placeholder.png"
          className="text-primary my-8"
          size="w-3/5"
          padding="p-2"
          rounded="rounded-md"
          setOutputImage={setCoverImage}
          isSquare={false}
        />
      </div>
      <div>
        <CreatableSelect
          placeholder="Tags"
          isMulti
          defaultValue={articleTags}
          value={articleTags}
          options={articleTagsOptions}
          onChange={(selectedOptions) => setArticleTags(selectedOptions)}
        />
      </div>
      <div>
        <ArticleEditor mdContent={mdContent} setMdContent={setMdContent} />
      </div>
      <Button
        textSize="text-lg 2xl:text-2xl"
        className={`font-bold my-8 py-3 ${
          (isLoading || !articleTitle || !articleSlug || !coverImage) &&
          "bg-green-800 hover:bg-green-800"
        }`}
        type="submit"
        disabled={isLoading || !articleTitle || !articleSlug || !coverImage}
      >
        {isLoading ? "Uploading..." : "Create Article"}
      </Button>
    </form>
  );
};

export default ArticleAddForm;
