import { ResourceItem } from "./index";
import { resourceItems } from "../constants";

const Resource = () => {
  return (
    <section className="py-24 border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <span className="section-line mb-4" />
          <h2 className="font-syne font-bold text-3xl text-neutral-100 mt-4">
            Start exploring
          </h2>
          <p className="text-sm font-mono text-neutral-500 mt-2">
            Choose your path and dive in
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {resourceItems.map((item, i) => (
            <ResourceItem key={item.slug} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resource;
