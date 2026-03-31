import { useNavigate } from "react-router-dom";

const Contribution = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <span className="section-line mb-4" />
          <h2 className="font-syne font-bold text-2xl text-neutral-100 mt-4">
            Contribute to the community
          </h2>
          <p className="text-sm font-mono text-neutral-500 mt-1">
            Share your knowledge with fellow coders
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {[
            {
              label: "Contribute a Question",
              desc: "Share a coding problem you think the community should practice.",
              path: "/add-question",
              icon: "❯",
            },
            {
              label: "Write an Article",
              desc: "Have insights to share? Write an article that helps others learn.",
              path: "/add-article",
              icon: "✎",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group p-6 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(17,17,20,0.6)] hover:border-[rgba(245,158,11,0.2)] hover:bg-[rgba(245,158,11,0.02)] transition-all duration-300 cursor-pointer"
              onClick={() => navigate(item.path)}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xl text-neutral-500 group-hover:text-accent transition-colors duration-200">
                  {item.icon}
                </span>
              </div>
              <h3 className="font-syne font-bold text-base text-neutral-100 mb-2">
                {item.label}
              </h3>
              <p className="text-sm font-mono text-neutral-500 leading-relaxed mb-4">
                {item.desc}
              </p>
              <span className="text-xs font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Get started →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contribution;
