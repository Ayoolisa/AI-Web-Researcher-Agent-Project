
import React, { useState } from 'react';

interface ChecklistItemProps {
  text: string;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ text }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label
      className="flex items-center space-x-3 cursor-pointer p-3 rounded-md transition-colors hover:bg-slate-700/50"
      onClick={() => setIsChecked(!isChecked)}
    >
      <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${isChecked ? 'bg-green-500 border-green-500' : 'bg-slate-700 border-slate-600'}`}>
        {isChecked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className={`flex-grow text-gray-300 ${isChecked ? 'line-through text-gray-500' : ''}`}>
        {text}
      </span>
    </label>
  );
};

export default ChecklistItem;
