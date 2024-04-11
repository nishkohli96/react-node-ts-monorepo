import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Pokemon = {
  name: string;
  url: string;
};

type PokeApiResult = {
  results: Pokemon[];
};

export const pokeApi = createApi({
  reducerPath: 'pokeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
    prepareHeaders: headers => {
      headers.set('X-some-KEY', 'API_KEY');
      return headers;
    }
  }),
  tagTypes: ['PokemonList'],
  endpoints: builder => ({
    getFirstNPokemon: builder.query<Pokemon[], number>({
      query: (payload = 20) => `pokemon?limit=${payload}&offset=0`,
      providesTags: ['PokemonList'],
      transformResponse: (rawResult: PokeApiResult) => rawResult.results,
      transformErrorResponse: (response: { status: string | number }) =>
        response.status
    })
  })
});

export const { useGetFirstNPokemonQuery } = pokeApi;
