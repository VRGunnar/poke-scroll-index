declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */

  interface ApolloContext {
    token?: string | string[];
    dataSources: {
      // add data sources here, this will be only to gather our pokemon data
    };
  }
}

export {};
