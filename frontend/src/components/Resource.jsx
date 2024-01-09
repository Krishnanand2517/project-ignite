import { ResourceItem } from "./index";
import { resourceItems } from "../constants";

const Resource = () => {
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
