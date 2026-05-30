export const MAX_POKEMON_ID = 1025;
export const MIN_POKEMON_ID = 1;
export const INITIAL_RANDOM_MAX_ID = 151;
export const MAX_STAT_VALUE = 255;

export const STAT_ORDER = [
  { key: "hp", label: "HP" },
  { key: "attack", label: "Attack" },
  { key: "defense", label: "Defense" },
  { key: "special-attack", label: "Sp. Atk" },
  { key: "special-defense", label: "Sp. Def" },
  { key: "speed", label: "Speed" },
] as const;

export const TYPE_COLORS: Record<string, [accent: string, glow: string]> = {
  fire: ["#ff6b3b", "#ff3b0088"],
  water: ["#4fc3f7", "#1565c088"],
  grass: ["#81c784", "#2e7d3288"],
  electric: ["#ffd54f", "#f9a82588"],
  psychic: ["#f48fb1", "#ad145788"],
  ice: ["#80deea", "#00697088"],
  dragon: ["#7e57c2", "#31198888"],
  dark: ["#a1887f", "#4e342e88"],
  fairy: ["#f48fb1", "#88003388"],
  fighting: ["#ff7043", "#bf360c88"],
  poison: ["#ce93d8", "#6a1b9a88"],
  ground: ["#bcaaa4", "#4e342e88"],
  rock: ["#bcaaa4", "#37474f88"],
  bug: ["#aed581", "#33691e88"],
  ghost: ["#9575cd", "#31135288"],
  steel: ["#b0bec5", "#37474f88"],
  flying: ["#80cbc4", "#00695c88"],
  normal: ["#e0e0e0", "#42424288"],
};

export function getTypePalette(type: string | undefined) {
  if (!type) {
    return { accent: "#ff3b3b", glow: "#ff3b3b88" };
  }

  const [accent, glow] = TYPE_COLORS[type] ?? ["#ff3b3b", "#ff3b3b88"];
  return { accent, glow };
}

export function formatPokemonName(name: string) {
  return name.replaceAll("-", " ").toUpperCase();
}

export function formatPokemonId(id: number) {
  return `#${String(id).padStart(3, "0")}`;
}

export function randomPokemonId(max = INITIAL_RANDOM_MAX_ID) {
  return Math.floor(Math.random() * max) + MIN_POKEMON_ID;
}

export function clampPokemonId(id: number) {
  return Math.min(MAX_POKEMON_ID, Math.max(MIN_POKEMON_ID, id));
}

export function statWidth(value: number) {
  return `${Math.min(100, (value / MAX_STAT_VALUE) * 100)}%`;
}
