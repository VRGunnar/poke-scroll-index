// datasources/PokemonAPI.ts

import { RESTDataSource } from "@apollo/datasource-rest";
import { handleError } from "../helpers";

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  order: number;
  is_default: boolean;
  abilities: {
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }[];
  types: {
    slot: number;
    type: { name: string; url: string };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }[];
  cries?: {
    latest?: string;
    legacy?: string;
  };
  species: {
    name: string;
    url: string;
  };
  sprites: {
    front_default?: string;
    front_shiny?: string;
    other?: {
      "official-artwork"?: { front_default?: string; front_shiny?: string };
      showdown?: {
        front_default?: string;
        front_shiny?: string;
        back_default?: string;
        back_shiny?: string;
      };
    };
  };
};

export class PokemonDataSource extends RESTDataSource {
  override readonly baseURL = "https://pokeapi.co/api/v2/";

  public async getPokemon(id: number) {
    try {
      const data = await this.get(`pokemon/${id}`);
      return data;
    } catch (error) {
      handleError(error);
    }
  }

  public async getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    return this.getPokemon(randomId);
  }
}
