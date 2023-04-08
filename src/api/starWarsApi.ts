import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IPeople {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface IPeopleResponse {
  results: IPeople[];
}

export const starWarsApi = createApi({
  reducerPath: "starWarsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  endpoints: (builder) => ({
    getPeopleByName: builder.query<IPeopleResponse, string>({
      query: (name) => `people/?search=${name}`,
    }),
  }),
});

export const { useGetPeopleByNameQuery } = starWarsApi;
