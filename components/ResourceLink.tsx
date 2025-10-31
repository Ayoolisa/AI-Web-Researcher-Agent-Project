
import React from 'react';
import { LinkIcon } from './Icons';

interface ResourceLinkProps {
  href: string;
  text: string;
}

const ResourceLink: React.FC<ResourceLinkProps> = ({ href, text }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700 transition-all duration-300 hover:bg-slate-700 hover:border-purple-400"
    >
      <span className="font-medium text-gray-200">{text}</span>
      <LinkIcon className="w-5 h-5 text-gray-400 transition-transform group-hover:text-purple-400 group-hover:rotate-45" />
    </a>
  );
};

export default ResourceLink;
