import { AboutItem } from "./index";

const About = () => {
  return (
    <div className="font-inconsolata text-secondary">
      <ul>
        <AboutItem
          imgPath="/journey.png"
          imgAlt="coding-journey"
          headText="Empower Your Learning Journey"
          paraText="Explore a wealth of learning resources, including articles, courses, and roadmaps, designed to elevate your coding skills."
        />
        <AboutItem
          imgPath="/creativity.png"
          imgAlt="create-projects"
          headText="Hands-On Projects"
          paraText="Dive into real-world application with a variety of project ideas and guided projects spanning different technologies."
        />
        <AboutItem
          imgPath="/practice.png"
          imgAlt="practice"
          headText="Practice Coding Skills"
          paraText="Sharpen your skills with a collection of Data Structure and Algorithms (DSA) problems tailored for interviews."
        />
      </ul>
    </div>
  );
};

export default About;
