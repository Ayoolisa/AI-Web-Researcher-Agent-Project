
import React, { useState } from 'react';
import { LogoIcon } from './Icons';

interface HeaderProps {
  route: string;
}

const Header: React.FC<HeaderProps> = ({ route }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClasses = (hash: string) => 
    `transition-colors ${route === hash ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`;

  return (
    <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#/" className="flex items-center space-x-3">
          <LogoIcon />
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            AI Agent Challenge
          </h1>
        </a>
        <nav className="hidden md:flex items-center space-x-6 text-sm">
          <a href="#/" className={navLinkClasses('#/')}>Home</a>
          <a href="#/researcher" className={navLinkClasses('#/researcher')}>Researcher Agent</a>
          <a href="#/assistant" className={navLinkClasses('#/assistant')}>Coding Assistant</a>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white focus:outline-none" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <nav className="container mx-auto px-4 pt-2 pb-4 flex flex-col space-y-2 text-center">
            <a href="#/" onClick={() => setIsMenuOpen(false)} className={`block py-2 ${navLinkClasses('#/')}`}>Home</a>
            <a href="#/researcher" onClick={() => setIsMenuOpen(false)} className={`block py-2 ${navLinkClasses('#/researcher')}`}>Researcher Agent</a>
            <a href="#/assistant" onClick={() => setIsMenuOpen(false)} className={`block py-2 ${navLinkClasses('#/assistant')}`}>Coding Assistant</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
