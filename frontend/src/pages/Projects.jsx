import { ProjectCategoryCard } from "../components";

const Projects = () => {
  const projects = [
    {
      title: "AI & ML",
      slug: "ai-ml",
    },
    {
      title: "Blockchain",
      slug: "blockchain",
    },
    {
      title: "Flutter",
      slug: "flutter",
    },
    {
      title: "NodeJS",
      slug: "nodejs",
    },
    {
      title: "ReactJS",
      slug: "reactjs",
    },
    {
      title: "React Native",
      slug: "react-native",
    },
  ];

  return (
    <div className="w-full pt-32 pb-4 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <h1 className="mb-16 text-4xl 2xl:text-6xl font-fira font-bold text-primary">
        Projects
      </h1>

      <ul className="flex flex-wrap gap-8">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCategoryCard slug={project.slug} title={project.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
