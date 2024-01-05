import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import articleService from "../services/articles";
import { Loader, ArticleCard, Button } from "../components";

const Articles = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesResponse = await articleService.getAll();

        const articleObjects = articlesResponse.data.map((article) =>
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

  const deleteArticle = async (slug) => {
    try {
      const response = await articleService.deleteOne(slug);

      if (response.statusCode === 200) {
        setArticles(articles.filter((article) => article.slug !== slug));
      }
    } catch (error) {
      console.log("Error deleting the article:", error);
    }
  };

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
              authorId={article.addedBy._id}
              tags={article.tags}
              deleteArticle={deleteArticle}
            />
          </li>
        ))}
      </ul>

      <div className="py-4 mt-10">
        <Button
          textSize="text-lg 2xl:text-2xl"
          className="font-bold"
          onClick={() => navigate("/add-article")}
        >
          Contribute Article
        </Button>
      </div>
    </div>
  );
};

export default Articles;
