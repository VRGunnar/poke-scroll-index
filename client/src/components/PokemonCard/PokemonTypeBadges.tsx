import { TYPE_COLORS } from "../constants";

type PokemonTypeBadgesProps = {
  types: string[];
  className?: string;
};

export function PokemonTypeBadges({
  types,
  className = "mb-5",
}: PokemonTypeBadgesProps) {
  return (
    <div
      className={`flex flex-wrap justify-center gap-2 relative z-10 ${className}`}
      aria-label="Pokemon types"
    >
      {types.map((type) => {
        const [accent] = TYPE_COLORS[type] ?? ["#aaaaaa", "#66666688"];
        return (
          <span
            key={type}
            className="explorer-type-badge explorer-fade-in"
            style={{
              color: accent,
              borderColor: `${accent}55`,
              backgroundColor: `${accent}18`,
            }}
          >
            {type.toUpperCase()}
          </span>
        );
      })}
    </div>
  );
}
