
import React from 'react';
import { LogoIcon } from './Icons';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center z-50" aria-label="Loading application">
      <div className="relative flex items-center justify-center">
        {/* Pulsing background glow */}
        <div className="absolute w-24 h-24 bg-cyan-500/30 rounded-full animate-ping"></div>
        <div className="relative scale-150">
           <LogoIcon />
        </div>
      </div>
      <p className="mt-8 text-xl text-gray-300 tracking-wider animate-pulse">
        Launching Agent...
      </p>
    </div>
  );
};

export default SplashScreen;
