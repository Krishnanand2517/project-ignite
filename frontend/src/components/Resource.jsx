import { ResourceItem } from "./index";

const Resource = () => {
  const resourceItems = [
    {
      imagePath: "/article.png",
      buttonText: "Articles ->",
      imageAlt: "articles",
      slug: "articles",
      paraText: "Explore insightful articles to enhance your coding knowledge.",
    },
    {
      imagePath: "/dev.png",
      buttonText: "Projects ->",
      imageAlt: "projects",
      slug: "projects",
      paraText:
        "Discover real-world projects to apply and reinforce your coding skills.",
    },
    {
      imagePath: "/questions.png",
      buttonText: "Questions ->",
      imageAlt: "questions",
      slug: "questions",
      paraText:
        "Sharpen your problem-solving skills or prepare for coding interviews.",
    },
  ];

  return (
    <ul className="font-inconsolata text-secondary flex justify-evenly">
      {resourceItems.map((item) => (
        <li key={item.slug}>
          <ResourceItem {...item} />
        </li>
      ))}
    </ul>
  );
};

export default Resource;
