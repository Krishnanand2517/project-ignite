import { ResourceItem } from "./index";

const Resource = () => {
  return (
    <div className="font-inconsolata text-secondary flex justify-evenly">
      <ResourceItem
        imagePath="/article.png"
        buttonText="Articles ->"
        imageAlt="articles"
        paraText="Explore insightful articles to enhance your coding knowledge."
      />

      <ResourceItem
        imagePath="/dev.png"
        buttonText="Projects ->"
        imageAlt="projects"
        paraText="Discover real-world projects to apply and reinforce your coding skills."
      />

      <ResourceItem
        imagePath="/questions.png"
        buttonText="Questions ->"
        imageAlt="questions"
        paraText="Sharpen your problem-solving skills or prepare for coding interviews."
      />
    </div>
  );
};

export default Resource;
