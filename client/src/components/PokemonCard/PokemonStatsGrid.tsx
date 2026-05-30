import { STAT_ORDER, statWidth } from "../constants";

type PokemonStatsGridProps = {
  stats: Array<{ name: string; value: number }>;
  accentColor: string;
};

export function PokemonStatsGrid({
  stats,
  accentColor,
}: PokemonStatsGridProps) {
  const statMap = new Map(stats.map((stat) => [stat.name, stat.value]));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mt-5 sm:mt-6 w-full relative z-10 px-3 sm:px-6 md:px-10 max-w-[980px]">
      {STAT_ORDER.map(({ key, label }) => {
        const value = statMap.get(key) ?? 0;
        return (
          <div key={key} className="explorer-stat-card">
            <div className="explorer-stat-label">{label}</div>
            <div className="explorer-stat-value" style={{ color: accentColor }}>
              {value}
            </div>
            <div className="h-[3px] bg-white/10 rounded-sm mt-1.5 overflow-hidden">
              <div
                className="h-[3px] rounded-sm transition-[width,background-color] duration-700 ease-out"
                style={{
                  width: statWidth(value),
                  backgroundColor: accentColor,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
