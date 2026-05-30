import { Pokemon } from "../../datasources/pokemon";

const resolvers = {
  Query: {
    randomPokemon: async (_: any, __: any, { dataSources }: ApolloContext) =>
      await dataSources.pokemon.getRandomPokemon(),
    pokemon: async (
      _: any,
      { id }: { id: number },
      { dataSources }: ApolloContext,
    ) => await dataSources.pokemon.getPokemon(id),
  },

  Pokemon: {
    image: (parent: Pokemon) =>
      parent.sprites?.other?.["official-artwork"]?.front_default ?? null,
    cryLatest: (parent: Pokemon) => parent.cries?.latest ?? null,
    cryLegacy: (parent: Pokemon) => parent.cries?.legacy ?? null,
    spriteDefault: (parent: Pokemon) => parent.sprites?.front_default ?? null,
    spriteShiny: (parent: Pokemon) => parent.sprites?.front_shiny ?? null,
    spriteArtwork: (parent: Pokemon) =>
      parent.sprites?.other?.["official-artwork"]?.front_default ?? null,
    spriteArtworkShiny: (parent: Pokemon) =>
      parent.sprites?.other?.["official-artwork"]?.front_shiny ?? null,
    spriteShowdown: (parent: Pokemon) =>
      parent.sprites?.other?.showdown?.front_default ?? null,
    spriteShowdownShiny: (parent: Pokemon) =>
      parent.sprites?.other?.showdown?.front_shiny ?? null,
    types: (parent: Pokemon) => parent.types?.map((t) => t.type.name) ?? [],
    abilities: (parent: Pokemon) =>
      parent.abilities?.map((a) => a.ability.name) ?? [],
    stats: (parent: Pokemon) =>
      parent.stats?.map((s) => ({ name: s.stat.name, value: s.base_stat })) ??
      [],
  },
};

export default resolvers;
