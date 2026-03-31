import { AboutItem } from "./index";

const aboutItems = [
  {
    imgPath: "/journey.png",
    imgAlt: "coding-journey",
    headText: "Empower Your Learning Journey",
    paraText:
      "Explore a wealth of learning resources — articles, courses, and roadmaps — designed to elevate your coding skills step by step.",
  },
  {
    imgPath: "/creativity.png",
    imgAlt: "create-projects",
    headText: "Hands-On Projects",
    paraText:
      "Dive into real-world application with project ideas and guided projects spanning different technologies and skill levels.",
  },
  {
    imgPath: "/practice.png",
    imgAlt: "practice",
    headText: "Practice Coding Skills",
    paraText:
      "Sharpen your skills with a curated collection of Data Structures and Algorithms problems tailored for technical interviews.",
  },
];

const About = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <span className="section-line mb-4" />
          <h2 className="font-syne font-bold text-3xl text-neutral-100 mt-4">
            Everything you need to
            <br />
            <span className="text-accent">level up</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {aboutItems.map((item, i) => (
            <AboutItem key={item.imgAlt} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
