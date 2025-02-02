import type { ComponentCategory } from '@/config/components';

type ComponentHeaderProps = {
  name: string;
  description: string;
  group?: ComponentCategory['group'];
};

export const ComponentHeader = ({
  name,
  description,
  group,
}: ComponentHeaderProps) => (
  <div className="mb-10 space-y-2">
    <h2 className="my-2 font-medium font-rubik text-4xl capitalize">{name}</h2>
    <p className="text-gray-700 text-lg dark:text-gray-300">{description}</p>
    {group && (
      <span className="inline-flex items-center rounded-md border border-[#555553]/30 bg-[#f4f6ef] px-2 py-0.5 font-medium text-gray-800 text-xs dark:border-[#636361] dark:bg-[#262624] dark:text-[#c7c8c5]">
        {group}
      </span>
    )}
  </div>
);
