import { formatPokemonMetric } from "../../helpers/formatMetrics";

interface PokemonMetricsPanelProps {
  weight: number;
  height: number;
  ability: string;
}

export function PokemonMetricsPanel({
  weight,
  height,
  ability,
}: PokemonMetricsPanelProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-y-1.5 gap-x-4 sm:gap-x-6 bg-white/10 rounded-lg px-2.5 sm:px-3 py-2 shadow-lg border border-white/15 w-[152px] md:w-auto">
      <div className="flex flex-col items-center">
        <span className="text-[11px] sm:text-[12px] md:text-[13px] font-semibold text-white/90 flex items-center gap-1">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="inline-block align-middle"
          >
            <path
              d="M6 10 L18 10 L20 20 L4 20 Z"
              fill="#fff"
              stroke="#fff"
              strokeWidth="1.2"
            />
            <circle
              cx="12"
              cy="7"
              r="3"
              fill="#fff"
              stroke="#fff"
              strokeWidth="1.2"
            />
            <text
              x="12"
              y="17"
              textAnchor="middle"
              fontSize="6"
              fontWeight="bold"
              fill="#000"
              fontFamily="Arial, Helvetica, sans-serif"
              dominantBaseline="middle"
            >
              KG
            </text>
          </svg>
          {formatPokemonMetric(weight, "kg")}
        </span>
        <span className="text-[8px] sm:text-[9px] md:text-[10px] text-white/50 mt-0.5">
          Weight
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[11px] sm:text-[12px] md:text-[13px] font-semibold text-white/90 flex items-center gap-1">
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 20 20"
            className="inline-block align-middle"
          >
            <rect x="9" y="3" width="2" height="14" rx="1" fill="#6ec6ff" />
            <polygon points="10,1 7,5 13,5" fill="#6ec6ff" />
            <polygon points="10,19 7,15 13,15" fill="#6ec6ff" />
          </svg>
          {formatPokemonMetric(height, "m")}
        </span>
        <span className="text-[8px] sm:text-[9px] md:text-[10px] text-white/50 mt-0.5">
          Height
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[10px] sm:text-[11px] md:text-[13px] font-semibold text-white/90 flex items-center gap-1 max-w-[132px] md:max-w-[42vw] truncate">
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 20 20"
            className="inline-block align-middle"
          >
            <path d="M4 10h12" stroke="#b388ff" strokeWidth="2" />
            <circle cx="10" cy="10" r="4" stroke="#b388ff" strokeWidth="2" />
          </svg>
          {ability}
        </span>
        <span className="text-[8px] sm:text-[9px] md:text-[10px] text-white/50 mt-0.5">
          Ability
        </span>
      </div>
    </div>
  );
}
