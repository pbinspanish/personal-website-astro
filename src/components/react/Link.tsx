import React from "react";
import type { LucideIcon } from "lucide-react";

export interface LinkProps {
  icon: LucideIcon;
  title: string;
  description: string;
  url: string;
}

const Link: React.FC<LinkProps> = ({ icon: Icon, title, description, url }) => {
  return (
    <div className="mb-3 flex items-center">
      <a
        href={url}
        target="_blank"
        title={title}
        className="text-decoration-none flex items-center transition-colors duration-150 ease-in-out hover:text-cyan-400 hover:dark:text-cyan-600"
      >
        <Icon className="text-decoration-none me-2 inline-block before:text-2xl" />

        {title}
        <span className="text-base-600 dark:text-base-500 ms-1">
          — {description}
        </span>
      </a>
    </div>
  );
};

export default Link;
