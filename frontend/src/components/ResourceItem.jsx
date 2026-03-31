import { useNavigate } from "react-router-dom";

const ResourceItem = ({
  slug,
  // imagePath,
  buttonText,
  // imageAlt = "",
  paraText = "",
  index = 0,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`fade-up-${
        index + 1
      } group relative rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(17,17,20,0.6)] overflow-hidden hover:border-[rgba(245,158,11,0.2)] transition-all duration-300 cursor-pointer`}
      onClick={() => navigate(`/${slug}`)}
    >
      <div className="p-6 space-y-4">
        <h3 className="font-syne text-lg text-neutral-100">{buttonText}</h3>

        <p className="text-sm font-mono text-[#a8a89e] leading-relaxed">
          {paraText}
        </p>

        <span className="text-accent text-sm font-medium">Explore →</span>
      </div>
    </div>
  );
};

export default ResourceItem;
