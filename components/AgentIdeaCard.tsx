
import React from 'react';

interface AgentIdeaCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AgentIdeaCard: React.FC<AgentIdeaCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 text-center transition-transform duration-300 hover:-translate-y-1">
      <div className="text-purple-400 w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-slate-700 rounded-full">
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

export default AgentIdeaCard;
