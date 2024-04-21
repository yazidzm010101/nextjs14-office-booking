import { ReactNode } from "react";

interface Props {
  name: String;
  description?: String;
  descriptor?: ReactNode;
  children?: ReactNode;
}

function SettingItem({ name, description, descriptor, children }: Props) {
  return (
    <div className="flex items-baseline w-full px-4 py-4">
      <h5 className="text-lg dark:text-gray-300">{name}</h5>
      <div className="ms-auto text-md dark:text-gray-400">
        {description ? <p className="text-md">{description}</p> : descriptor }
      </div>
    </div>
  );
}

export default SettingItem;
