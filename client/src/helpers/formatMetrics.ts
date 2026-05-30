export function formatPokemonMetric(
  value: number | null | undefined,
  unit: "kg" | "m",
): string {
  if (typeof value !== "number") return "?";
  return unit === "kg"
    ? `${(value / 10).toFixed(1)} kg`
    : `${(value / 10).toFixed(1)} m`;
}
