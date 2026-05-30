// Utility functions for PokemonCard

export function isGifSprite(url: string) {
  return url.toLowerCase().endsWith(".gif");
}

export function getPokemonSprite(
  pokemon:
    | {
        image?: string | null;
        spriteDefault?: string | null;
        spriteShiny?: string | null;
        spriteArtwork?: string | null;
        spriteArtworkShiny?: string | null;
        spriteShowdown?: string | null;
        spriteShowdownShiny?: string | null;
      }
    | null
    | undefined,
  shiny: boolean,
) {
  if (!pokemon) {
    return { url: null, isGif: false };
  }

  const url = shiny
    ? (pokemon.spriteShowdownShiny ??
      pokemon.spriteArtworkShiny ??
      pokemon.spriteShowdown ??
      pokemon.spriteArtwork ??
      pokemon.spriteShiny ??
      pokemon.spriteDefault ??
      pokemon.image ??
      null)
    : (pokemon.spriteShowdown ??
      pokemon.spriteArtwork ??
      pokemon.spriteDefault ??
      pokemon.image ??
      null);

  return {
    url,
    isGif: url ? isGifSprite(url) : false,
  };
}
