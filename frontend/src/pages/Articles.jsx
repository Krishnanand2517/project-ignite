import { useEffect, useState } from "react";
import articleService from "../services/articles";
import { Loader, ArticleCard } from "../components";

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesData = await articleService.getAll();

        const articleObjects = articlesData.data.map((article) =>
          Object({
            title: article.articleTitle,
            slug: article.articleSlug,
            imgPath: article.coverImage,
            addedBy: article.author,
            tags: article.tags,
          })
        );

        setArticles(articleObjects);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching articles data:", error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen pt-32 pb-4 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
        <h1 className="mb-8 text-4xl 2xl:text-6xl font-fira font-bold text-primary">
          Articles
        </h1>

        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-32 pb-4 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <h1 className="mb-8 text-4xl 2xl:text-6xl font-fira font-bold text-primary">
        Articles
      </h1>

      <ul className="flex flex-col gap-y-8">
        {articles.map((article) => (
          <li key={article.slug}>
            <ArticleCard
              title={article.title}
              slug={article.slug}
              imgPath={article.imgPath}
              authorName={article.addedBy.fullName}
              tags={article.tags}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
