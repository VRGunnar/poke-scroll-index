export const resolvers = {
  // this is some simple dummy resolver to prevent empty content errors
  Query: {
    pokemons: () => [
      { id: "1", name: "Bulbasaur" },
      { id: "2", name: "Charmander" },
      { id: "3", name: "Squirtle" },
    ],
  },
};
