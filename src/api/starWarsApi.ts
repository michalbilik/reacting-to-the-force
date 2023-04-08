import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IPeople {
  birth_year: string;
  films: string[];
  homeworld: string;
  name: string;
  starships: string[];
  vehicles: string[];
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

export const {
  useGetPeopleByNameQuery,
} = starWarsApi;
