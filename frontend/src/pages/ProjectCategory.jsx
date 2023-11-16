import { ProjectCard } from "../components";

const ProjectCategory = () => {
  const page = {
    title: "Blockchain",
    projects: [
      {
        title: "NFT Store",
        duration: "30 hours",
        difficulty: "Beginner",
        slug: "/project-1",
      },
      {
        title: "NFT Store",
        duration: "30 hours",
        difficulty: "Beginner",
        slug: "/project-2",
      },
      {
        title: "NFT Store",
        duration: "30 hours",
        difficulty: "Beginner",
        slug: "/project-3",
      },
      {
        title: "NFT Store",
        duration: "30 hours",
        difficulty: "Beginner",
        slug: "/project-4",
      },
    ],
  };

  return (
    <div className="w-full line-numbers pt-32 pb-4 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <h1 className="mb-16 text-4xl 2xl:text-6xl font-fira font-bold text-primary">
        {page.title} Projects
      </h1>

      <ul className="flex flex-wrap gap-8">
        {page.projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard
              slug={project.slug}
              title={project.title}
              difficulty={project.difficulty}
              duration={project.duration}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectCategory;
