// public/icons/IconCalendar.tsx
import React from 'react';

interface IconProps {
  strokeColor?: string;
}

const IconCalendar: React.FC<IconProps> = ({ strokeColor = "#71717a" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={strokeColor}
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v7.5a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75V3a.75.75 0 01.75-.75h3a.75.75 0 01.75.75zM4 6h16M6.75 19.5a.75.75 0 01-.75-.75v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75h-3zM13 6h6m-6 6h6m-6 6h6M12 3v7.5a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75V3a.75.75 0 01.75-.75h3a.75.75 0 01.75.75z" />
    </svg>
  );
};

export default IconCalendar;