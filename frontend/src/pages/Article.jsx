import { lazy, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import articleService from "../services/articles";
import { Loader, Likes } from "../components";

const ArticleViewer = lazy(() => import("../components/ArticleViewer"));

const Article = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.userData?._id);
  const [isLoading, setIsLoading] = useState(true);
  const [articleObject, setArticleObject] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleResponse = await articleService.getOne(slug);
        setArticleObject(articleResponse.data);
        setLikesCount(articleResponse.data.likedBy?.length);
        if (
          articleResponse.data.likedBy?.find(
            (account) => account._id.toString() === userId
          )
        ) {
          setIsLiked(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching article:", error);
      }
    };
    fetchData();
  }, [slug, userId]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setLikesCount((prev) => prev + 1);
    setIsLiked(true);
    await articleService.likeOne(slug);
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#0a0a0b] pt-24 flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0a0b] pt-24">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Cover image */}
        <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] mb-12 aspect-video bg-[rgba(255,255,255,0.02)]">
          <img
            src={articleObject.coverImage}
            alt={articleObject.articleTitle}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title + author */}
        <div className="mb-10">
          <h1
            className="font-syne font-bold text-neutral-100 leading-tight mb-5"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            {articleObject.articleTitle}
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[rgba(255,255,255,0.1)] flex-shrink-0">
              {articleObject.author.avatarImage ? (
                <img
                  src={articleObject.author.avatarImage}
                  alt="author"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[rgba(245,158,11,0.1)] flex items-center justify-center text-accent text-xs font-syne font-bold">
                  {articleObject.author.fullName?.[0]}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-syne font-semibold text-neutral-100">
                {articleObject.author.fullName}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(255,255,255,0.06)] mb-10" />

        {/* Content */}
        <div className="font-mono text-[#a8a89e] text-sm leading-relaxed">
          <ArticleViewer link={articleObject.content} />
        </div>

        {/* Like */}
        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.06)]">
          <Likes
            likesCount={likesCount}
            handleLike={handleLike}
            isLiked={isLiked}
          />
        </div>
      </div>
    </div>
  );
};

export default Article;
