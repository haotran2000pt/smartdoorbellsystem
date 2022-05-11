import React, { ReactNode } from "react";

interface ContentHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({
  title,
  children,
  description,
}) => {
  return (
    <div className="border-b p-10">
      <h1 className="text-2xl font-bold text-zinc-800 flex justify-between items-center max-w-[800px]">
        <div>{title}</div>
        {children}
      </h1>
      {description && (
        <div className="text-gray-600 font-semibold mt-1 ml-0.5">{description}</div>
      )}
    </div>
  );
};

export default ContentHeader;
