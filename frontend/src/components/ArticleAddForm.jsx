import { lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import articleService from "../services/articles";
import { Input, ImageInput } from "./index";
import { articleTagsList } from "../constants";

const ArticleEditor = lazy(() => import("./ArticleEditor"));

const articleTagsOptions = articleTagsList.map((tag) => ({
  value: tag,
  label: tag,
}));

const selectStyles = {
  control: (base, state) => ({
    ...base,
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${
      state.isFocused ? "#f59e0b" : "rgba(255,255,255,0.08)"
    }`,
    borderRadius: "8px",
    boxShadow: "none",
    "&:hover": { borderColor: "rgba(255,255,255,0.14)" },
    padding: "2px 4px",
  }),
  menu: (base) => ({
    ...base,
    background: "#17171b",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "8px",
    overflow: "hidden",
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? "rgba(245,158,11,0.1)" : "transparent",
    color: state.isFocused ? "#f59e0b" : "#a8a89e",
    fontSize: "12px",
    fontFamily: "'DM Mono', monospace",
    cursor: "pointer",
  }),
  multiValue: (base) => ({
    ...base,
    background: "rgba(245,158,11,0.12)",
    borderRadius: "99px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#f59e0b",
    fontSize: "11px",
    fontFamily: "'DM Mono', monospace",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#f59e0b",
    "&:hover": { background: "rgba(245,158,11,0.2)", color: "#f59e0b" },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#5a5a54",
    fontSize: "13px",
    fontFamily: "'DM Mono', monospace",
  }),
  input: (base) => ({
    ...base,
    color: "#f5f5f0",
    fontSize: "13px",
    fontFamily: "'DM Mono', monospace",
  }),
};

const ArticleAddForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleSlug, setArticleSlug] = useState("");
  const [articleTags, setArticleTags] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [mdContent, setMdContent] = useState("### Write your article here...");

  const makeArticleFile = (contents) => {
    const blob = new Blob([contents], { type: "text/plain" });
    return new File([blob], "output.md", { type: "text/markdown" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("articleTitle", articleTitle);
    formData.append("articleSlug", articleSlug);
    formData.append("coverImage", coverImage);
    formData.append("content", makeArticleFile(mdContent));
    articleTags.forEach((tag) => formData.append("tags[]", tag.value));
    setIsLoading(true);
    try {
      const response = await articleService.createOne(formData);
      if (response.statusCode === 201) navigate("/articles");
    } catch (error) {
      console.log("Error creating article:", error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="mb-8">
        <span className="section-line mb-4" />
        <h2 className="font-syne font-bold text-2xl text-neutral-100 mt-4">
          Write Article
        </h2>
        <p className="text-sm font-mono text-neutral-500 mt-1">
          Share your insights with the community
        </p>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,20,0.7)] backdrop-blur-xl p-6 space-y-4">
        <Input
          label="Article title"
          value={articleTitle}
          onChange={({ target }) => setArticleTitle(target.value)}
        />
        <Input
          label="Slug (URL-friendly, e.g. my-first-post)"
          value={articleSlug}
          onChange={({ target }) => setArticleSlug(target.value)}
        />
        <ImageInput
          label="Cover image"
          defaultSrc="/article_placeholder.png"
          className="text-primary"
          size="w-full"
          padding="p-2"
          rounded="rounded-xl"
          setOutputImage={setCoverImage}
          isSquare={false}
        />
        <CreatableSelect
          placeholder="Add tags (select or create)"
          isMulti
          value={articleTags}
          options={articleTagsOptions}
          onChange={setArticleTags}
          styles={selectStyles}
          menuPortalTarget={document.body}
          menuPosition="fixed"
        />
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,20,0.7)] backdrop-blur-xl overflow-hidden">
        <ArticleEditor mdContent={mdContent} setMdContent={setMdContent} />
      </div>

      <button
        type="submit"
        disabled={isLoading || !articleTitle || !articleSlug || !coverImage}
        className="w-full py-3 rounded-xl font-syne font-semibold text-sm bg-accent text-black hover:bg-amber-400 hover:shadow-[0_0_24px_rgba(245,158,11,0.3)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.99]"
      >
        {isLoading ? "Publishing..." : "Publish Article →"}
      </button>
    </form>
  );
};

export default ArticleAddForm;
