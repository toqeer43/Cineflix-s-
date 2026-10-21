import React from 'react';

interface ToastProps {
  message: string;
  icon?: string;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, icon, visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-full bg-[#201f22]/95 border border-white/10 text-[#e5e1e4] font-medium text-sm flex items-center gap-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in duration-200 pointer-events-none">
      {icon && (
        <span className="material-symbols-outlined text-[18px] text-[#ffb4aa]" style={{ fontVariationSettings: "'FILL' 1" }}>
          {icon}
        </span>
      )}
      <span>{message}</span>
    </div>
  );
};
