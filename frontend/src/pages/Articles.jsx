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
            <a href={article.slug}>
              <div className="px-12 py-6 flex gap-x-4 font-inconsolata text-secondary border border-white rounded-md hover:bg-black hover:bg-opacity-20 hover:backdrop-blur-3xl">
                <div className="max-w-xs flex justify-center items-center">
                  <img
                    src={article.imgPath}
                    alt={article.title}
                    className="w-3/4 2xl:w-11/12"
                  />
                </div>
                <div className="flex flex-wrap">
                  <h3 className="w-full font-fira font-semibold text-xl 2xl:text-3xl">
                    {article.title}
                  </h3>
                  <p className="w-full 2xl:text-2xl">{article.content}</p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
