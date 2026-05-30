import React from "react";

interface PokemonSpriteProps {
  spriteUrl: string | null;
  isGif: boolean;
  name: string;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  cryUrl?: string | null;
}

export function PokemonSprite({
  spriteUrl,
  isGif,
  name,
  onClick,
  onKeyDown,
  cryUrl,
}: PokemonSpriteProps) {
  return (
    <div
      className={`explorer-image-stage relative z-10 flex items-center justify-center ${cryUrl ? "cursor-pointer" : "cursor-default"}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={cryUrl ? 0 : -1}
      aria-label={cryUrl ? `Play ${name} cry` : `${name} cry unavailable`}
    >
      <div className="explorer-glow absolute -inset-5 rounded-full" />
      <div className="explorer-ring absolute inset-0 rounded-full" />
      {spriteUrl ? (
        <img
          src={spriteUrl}
          alt={name}
          className="explorer-pokemon-image explorer-slide-in relative z-10 object-contain"
          style={{
            imageRendering: isGif ? "pixelated" : "auto",
            width: isGif ? "164px" : "160px",
            height: isGif ? "164px" : "160px",
          }}
        />
      ) : (
        <div className="explorer-orbitron text-xs tracking-[0.2em] text-white/40">
          NO IMAGE
        </div>
      )}
    </div>
  );
}
