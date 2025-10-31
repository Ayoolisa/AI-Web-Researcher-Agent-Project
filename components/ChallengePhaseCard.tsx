
import React from 'react';
import { CheckCircleIcon } from './Icons';

interface ChallengePhaseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
}

const ChallengePhaseCard: React.FC<ChallengePhaseCardProps> = ({ icon, title, description, details }) => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 p-6 rounded-xl border border-slate-700 h-full flex flex-col transition-all duration-300 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/10">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-slate-700 p-3 rounded-lg text-cyan-400">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-400 mb-5 flex-grow">{description}</p>
      <ul className="space-y-2 text-sm">
        {details.map((detail, index) => (
          <li key={index} className="flex items-start">
            <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300">{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengePhaseCard;
