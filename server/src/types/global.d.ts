import { PokemonDataSource } from "../datasources/pokemon";
declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */

  interface ApolloContext {
    token?: string | string[];
    dataSources: {
      pokemon: PokemonDataSource;
    };
  }
}

export {};
