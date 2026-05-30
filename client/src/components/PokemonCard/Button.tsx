import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Button({
  onClick,
  children,
  ariaLabel,
  active = false,
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`explorer-nav-button text-[10px] px-3 py-1.5 rounded-md border transition-colors cursor-pointer ${
        active
          ? "border-(--explorer-accent) bg-white/15 text-(--explorer-accent)"
          : "border-white/15 bg-white/5 text-white/45 hover:bg-white/10"
      } ${disabled ? "opacity-30 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
