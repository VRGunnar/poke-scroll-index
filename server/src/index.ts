import express from "express";
import cors from "cors";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { loadFiles } from "@graphql-tools/load-files";
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";

async function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const server = new ApolloServer<ApolloContext>({
    typeDefs: await loadFiles(`${__dirname}/**/*.graphql`),
    resolvers: await loadFiles(`${__dirname}/**/*.resolvers.{ts,js}`),
    plugins: [
      ApolloServerPluginCacheControl({ defaultMaxAge: 60 }),
    ],
    introspection: true,
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json({ limit: "50mb" }),
    expressMiddleware(server, {
      context: async ({ req }) => {
        return {
          token: req.headers.token,
          dataSources: {
            // persist datasources here, to access them later in resolvers
          },
        };
      },
    }),
  );

  app.listen(4000, () => {
    console.log("Server running on http://localhost:4000/graphql");
  });
}

startServer();
