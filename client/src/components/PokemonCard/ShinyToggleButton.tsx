import React from "react";

interface ShinyToggleButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel: string;
}

export function ShinyToggleButton({
  active,
  onClick,
  children,
  ariaLabel,
}: ShinyToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`explorer-nav-button text-[10px] px-3 py-1.5 rounded-md border transition-colors cursor-pointer ${
        active
          ? "border-(--explorer-accent) bg-white/15 text-(--explorer-accent)"
          : "border-white/15 bg-white/5 text-white/45 hover:bg-white/10"
      }`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
