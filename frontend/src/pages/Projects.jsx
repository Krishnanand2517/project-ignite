import { ProjectCategoryCard } from "../components";

const projects = [
  { title: "AI & ML", slug: "ai-ml" },
  { title: "Blockchain", slug: "blockchain" },
  { title: "Flutter", slug: "flutter" },
  { title: "NodeJS", slug: "nodejs" },
  { title: "ReactJS", slug: "reactjs" },
  { title: "React Native", slug: "react-native" },
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0b] pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <span className="section-line mb-4" />
          <h1 className="font-syne font-bold text-3xl text-neutral-100 mt-4">
            Projects
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center py-24 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(17,17,20,0.4)]">
          <div className="text-4xl mb-4">🚧</div>
          <h4 className="font-syne font-bold text-xl text-neutral-100 mb-2">
            Under Construction
          </h4>
          <p className="text-sm font-mono text-neutral-600">
            This section is coming soon. Check back later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
