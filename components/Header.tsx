
import React from 'react';
import { LogoIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <LogoIcon />
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            AI Agent Challenge Guide
          </h1>
        </div>
        <div className="hidden md:block text-sm text-gray-400">
          Powered by <span className="font-semibold text-cyan-400">Nosana</span> & <span className="font-semibold text-purple-400">Mastra</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
