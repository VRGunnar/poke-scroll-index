import { useQuery } from "@apollo/client/react";
import { useFragment } from "../gql";
import {
  PokemonFieldsFragmentDoc,
  RandomPokemonDocument,
} from "../gql/graphql";

export function PokemonCard() {
  const { data, loading, error, refetch } = useQuery(RandomPokemonDocument);
  const pokemon = useFragment(PokemonFieldsFragmentDoc, data?.randomPokemon);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500 animate-pulse">Loading Pokémon…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4 w-72">
        {pokemon.image && (
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-40 h-40 object-contain"
          />
        )}

        <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
        <p className="text-gray-400 text-sm">
          #{String(pokemon.id).padStart(4, "0")}
        </p>

        <div className="flex gap-2 flex-wrap justify-center">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 capitalize"
            >
              {type}
            </span>
          ))}
        </div>

        <div className="w-full border-t border-gray-100 dark:border-gray-700 pt-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
            Abilities
          </p>
          <div className="flex gap-2 flex-wrap">
            {pokemon.abilities.map((ability) => (
              <span
                key={ability}
                className="px-2 py-1 rounded text-xs bg-gray-100 dark:bg-gray-700 capitalize"
              >
                {ability}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-6 text-sm text-gray-500">
          {pokemon.height != null && (
            <span>
              Height: <strong>{pokemon.height / 10} m</strong>
            </span>
          )}
          {pokemon.weight != null && (
            <span>
              Weight: <strong>{pokemon.weight / 10} kg</strong>
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => refetch()}
        className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 active:scale-95 transition-all"
      >
        Random Pokémon
      </button>
    </div>
  );
}
