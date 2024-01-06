import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import articleService from "../services/articles";
import { ArticleViewer, Loader, Likes } from "../components";

const Article = () => {
  const { slug } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [articleObject, setArticleObject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleResponse = await articleService.getOne(slug);
        setArticleObject(articleResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching article data:", error);
      }
    };

    fetchData();
  }, [slug]);

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
    <div className="w-full min-h-screen line-numbers pt-32 pb-4 px-48 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <div className="w-3/4 mx-auto border border-white rounded-lg shadow-xl shadow-white mb-20">
        <img
          src={articleObject.coverImage}
          alt={articleObject.articleTitle}
          className="rounded-lg"
        />
      </div>
      <h1 className="mt-32 mb-4 text-5xl 2xl:text-7xl text-center font-bold text-primary">
        {articleObject.articleTitle}
      </h1>
      <h2 className="mb-16 text-2xl 2xl:text-4xl text-center font-semibold text-primary">
        by {articleObject.author.fullName}
        <img
          src={articleObject.author.avatarImage}
          alt="Profile Picture"
          className="w-16 2xl:w-20 inline ml-10 rounded-full border-2 border-white hover:border-orange-400"
        />
      </h2>
      <div className="w-full 2xl:text-xl">
        <ArticleViewer link={articleObject.content} />
      </div>
      <Likes likesCount={23} className="mt-12" />
    </div>
  );
};

export default Article;
