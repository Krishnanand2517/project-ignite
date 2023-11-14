import { ArticleCard } from "../components";

const Articles = () => {
  const articles = [
    {
      title: "6 React Hooks you need to know",
      imgPath: "/article.png",
      slug: "/6-react-hooks",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, iste fugit sunt vero rerum ut suscipit libero, placeat eaque dolor dignissimos aliquid repellendus numquam atque a tenetur doloribus quod commodi.",
    },
    {
      title: "Angular vs. React: What to choose in 2024?",
      imgPath: "/article.png",
      slug: "/angular-vs-react",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, iste fugit sunt vero rerum ut suscipit libero, placeat eaque dolor dignissimos aliquid repellendus numquam atque a tenetur doloribus quod commodi.",
    },
    {
      title: "How to get started in Machine Learning?",
      imgPath: "/article.png",
      slug: "/start-machine-learning",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, iste fugit sunt vero rerum ut suscipit libero, placeat eaque dolor dignissimos aliquid repellendus numquam atque a tenetur doloribus quod commodi.",
    },
    {
      title: "Interviewing at Google? Try these tips",
      imgPath: "/article.png",
      slug: "/google-interview-tips",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, iste fugit sunt vero rerum ut suscipit libero, placeat eaque dolor dignissimos aliquid repellendus numquam atque a tenetur doloribus quod commodi.",
    },
  ];

  return (
    <div className="w-full pt-32 pb-4 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <h1 className="mb-8 text-4xl 2xl:text-6xl font-fira font-bold text-primary">
        Articles
      </h1>

      <ul className="flex flex-col gap-y-8">
        {articles.map((article) => (
          <li key={article.slug}>
            <ArticleCard
              slug={article.slug}
              imgPath={article.imgPath}
              content={article.content}
              title={article.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
