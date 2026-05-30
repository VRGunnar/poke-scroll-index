/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "fragment PokemonFields on Pokemon {\n  id\n  name\n  image\n  cryLatest\n  cryLegacy\n  spriteDefault\n  spriteShiny\n  spriteArtwork\n  spriteArtworkShiny\n  spriteShowdown\n  spriteShowdownShiny\n  types\n  abilities\n  height\n  weight\n  stats {\n    name\n    value\n  }\n}": typeof types.PokemonFieldsFragmentDoc,
    "query PokemonById($id: Int!) {\n  pokemon(id: $id) {\n    ...PokemonFields\n  }\n}": typeof types.PokemonByIdDocument,
    "query RandomPokemon {\n  randomPokemon {\n    ...PokemonFields\n  }\n}": typeof types.RandomPokemonDocument,
};
const documents: Documents = {
    "fragment PokemonFields on Pokemon {\n  id\n  name\n  image\n  cryLatest\n  cryLegacy\n  spriteDefault\n  spriteShiny\n  spriteArtwork\n  spriteArtworkShiny\n  spriteShowdown\n  spriteShowdownShiny\n  types\n  abilities\n  height\n  weight\n  stats {\n    name\n    value\n  }\n}": types.PokemonFieldsFragmentDoc,
    "query PokemonById($id: Int!) {\n  pokemon(id: $id) {\n    ...PokemonFields\n  }\n}": types.PokemonByIdDocument,
    "query RandomPokemon {\n  randomPokemon {\n    ...PokemonFields\n  }\n}": types.RandomPokemonDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment PokemonFields on Pokemon {\n  id\n  name\n  image\n  cryLatest\n  cryLegacy\n  spriteDefault\n  spriteShiny\n  spriteArtwork\n  spriteArtworkShiny\n  spriteShowdown\n  spriteShowdownShiny\n  types\n  abilities\n  height\n  weight\n  stats {\n    name\n    value\n  }\n}"): (typeof documents)["fragment PokemonFields on Pokemon {\n  id\n  name\n  image\n  cryLatest\n  cryLegacy\n  spriteDefault\n  spriteShiny\n  spriteArtwork\n  spriteArtworkShiny\n  spriteShowdown\n  spriteShowdownShiny\n  types\n  abilities\n  height\n  weight\n  stats {\n    name\n    value\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query PokemonById($id: Int!) {\n  pokemon(id: $id) {\n    ...PokemonFields\n  }\n}"): (typeof documents)["query PokemonById($id: Int!) {\n  pokemon(id: $id) {\n    ...PokemonFields\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query RandomPokemon {\n  randomPokemon {\n    ...PokemonFields\n  }\n}"): (typeof documents)["query RandomPokemon {\n  randomPokemon {\n    ...PokemonFields\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;