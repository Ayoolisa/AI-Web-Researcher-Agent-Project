
import React from 'react';
import { DiscordIcon, TwitterIcon, GitHubIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-900">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Nosana & Mastra. Good luck, builders!
        </p>
        <div className="flex items-center space-x-6">
          <a href="https://twitter.com/nosana_ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <TwitterIcon />
          </a>
          <a href="https://nosana.io/discord" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <DiscordIcon />
          </a>
          <a href="https://github.com/nosana-ci" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <GitHubIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
