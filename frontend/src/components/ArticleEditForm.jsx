import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

import articleService from "../services/articles";
import { ArticleEditor, Input, Button } from "./index";
import { articleTagsList } from "../constants";

const articleTagsOptions = articleTagsList.map((tag) => ({
  value: tag,
  label: tag,
}));

const ArticleEditForm = ({ id }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [articleTitle, setArticleTitle] = useState("");
  const [articleTags, setArticleTags] = useState([]);

  const [mdContent, setMdContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await articleService.getOne(id);
        const articleData = response.data;

        setArticleTitle(articleData.articleTitle);

        setArticleTags(
          articleData.tags?.map((tag) => ({
            value: tag,
            label: tag,
          }))
        );

        const mdFile = await fetch(articleData.content);
        const content = await mdFile.text();

        setMdContent(content);

        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching article data:", error);
      }
    };

    fetchData();
  }, [id]);

  const makeArticleFile = (contents) => {
    const dataBlob = new Blob([contents], { type: "text/plain" });
    const file = new File([dataBlob], "output.md", {
      type: "text/markdown",
    });
    return file;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const contentFile = makeArticleFile(mdContent);

    const articleFormData = new FormData();
    articleFormData.append("articleTitle", articleTitle);
    articleFormData.append("content", contentFile);
    articleTags.forEach((tag) => {
      articleFormData.append("tags[]", tag.value);
    });

    setIsLoading(true);

    try {
      const response = await articleService.updateOne(id, articleFormData);
      setIsLoading(false);

      if (response.statusCode === 200) {
        navigate("/articles");
      }
    } catch (error) {
      console.log("Error while editing article:", error);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-14 flex flex-col gap-y-5 2xl:gap-y-10 font-inconsolata"
    >
      <h2 className="text-2xl 2xl:text-4xl font-fira font-bold text-primary text-center mb-8 2xl:mb-12">
        Edit Article
      </h2>
      <div>
        <Input
          label="Article Title"
          value={articleTitle}
          onChange={({ target }) => setArticleTitle(target.value)}
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
          classNames={{
            control: () => "py-1 2xl:py-2 px-2 2xl:px-4 2xl:text-2xl",
            option: () => "2xl:text-2xl",
            menuList: () => "2xl:text-xl",
          }}
        />
      </div>
      <div>
        <ArticleEditor mdContent={mdContent} setMdContent={setMdContent} />
      </div>
      <Button
        textSize="text-lg 2xl:text-2xl"
        className={`font-bold 2xl:font-black my-8 2xl:my-12 py-3 2xl:py-6 ${
          (isLoading || !articleTitle) && "bg-green-800 hover:bg-green-800"
        }`}
        type="submit"
        disabled={isLoading || !articleTitle}
      >
        {isLoading ? "Updating..." : "Edit Article"}
      </Button>
    </form>
  );
};

export default ArticleEditForm;
