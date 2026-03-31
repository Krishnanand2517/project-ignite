import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import articleService from "../services/articles";
import { Loader, ArticleCard } from "../components";

const Articles = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesResponse = await articleService.getAll();
        const articleObjects = articlesResponse.data.map((article) => ({
          title: article.articleTitle,
          slug: article.articleSlug,
          imgPath: article.coverImage,
          addedBy: article.author,
          tags: article.tags,
        }));
        setArticles(articleObjects);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching articles:", error);
      }
    };
    fetchData();
  }, []);

  const deleteArticle = async (slug) => {
    try {
      const response = await articleService.deleteOne(slug);
      if (response.statusCode === 200) {
        setArticles(articles.filter((a) => a.slug !== slug));
      }
    } catch (error) {
      console.log("Error deleting article:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] pt-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="section-line mb-4" />
            <h1 className="font-syne font-bold text-3xl text-neutral-100 mt-4">
              Articles
            </h1>
            {!isLoading && (
              <p className="text-sm font-mono text-neutral-500 mt-1">
                {articles.length} articles
              </p>
            )}
          </div>
          <button
            onClick={() => navigate("/add-article")}
            className="font-syne font-semibold text-sm px-5 py-2.5 rounded-xl bg-accent text-black hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-200 active:scale-[0.98]"
          >
            + Write article
          </button>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <ul className="flex flex-col gap-4">
            {articles.map((article) => (
              <li key={article.slug}>
                <ArticleCard
                  title={article.title}
                  slug={article.slug}
                  imgPath={article.imgPath}
                  authorName={article.addedBy.fullName}
                  authorId={article.addedBy._id}
                  tags={article.tags}
                  deleteArticle={deleteArticle}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Articles;
