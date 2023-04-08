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
    getPlanet: builder.query<any, string>({
      query: (id) => `planets/${id}`,
    }),
    getFilm: builder.query<any, string>({
      query: (id) => `films/${id}`,
    }),
    getSpecies: builder.query<any, string>({
      query: (id) => `species/${id}`,
    }),
    getVehicle: builder.query<any, string>({
      query: (id) => `vehicles/${id}`,
    }),
    getStarship: builder.query<any, string>({
      query: (id) => `starships/${id}`,
    }),
  }),
});

export const {
  useGetPeopleByNameQuery,
  useGetPlanetQuery,
  useGetFilmQuery,
  useGetSpeciesQuery,
  useGetVehicleQuery,
  useGetStarshipQuery,
} = starWarsApi;
