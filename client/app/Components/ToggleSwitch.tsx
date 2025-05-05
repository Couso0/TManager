import React from 'react';

interface ToggleSwitchProps {
  completed: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ completed, onToggle }) => {
  return (
    <div
      className="relative w-12 h-6 bg-gray-300 rounded-full cursor-pointer"
      onClick={onToggle}
    >
      <div
        className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          completed ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
    </div>
  );
};

export default ToggleSwitch;