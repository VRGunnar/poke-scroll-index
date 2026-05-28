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
    types: (parent: Pokemon) => parent.types?.map((t) => t.type.name) ?? [],
    abilities: (parent: Pokemon) =>
      parent.abilities?.map((a) => a.ability.name) ?? [],
    // maybe add gifs later? Worth experimenting with
    // maybe add cries too
  },
};

export default resolvers;
