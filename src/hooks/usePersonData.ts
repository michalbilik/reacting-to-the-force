import {
  useGetPlanetQuery,
  useGetFilmQuery,
  useGetVehicleQuery,
  useGetStarshipQuery,
} from "../api/starWarsApi";

export const usePersonData = (person: any) => {
  // Homeworld
  const homeworldId = person.homeworld.split("/").slice(-2, -1)[0];
  const { data: homeworldData, isLoading: isLoadingHomeworld } =
    useGetPlanetQuery(homeworldId);

  // Films
  const filmIds = person.films.map(
    (film: string) => film.split("/").slice(-2, -1)[0]
  );
  const filmQueries = filmIds.map((id: string) => useGetFilmQuery(id));
  const films = filmQueries
    .map((query: ReturnType<typeof useGetFilmQuery>) => query.data?.title)
    .filter(Boolean);
  const isLoadingFilms = filmQueries.some(
    (query: ReturnType<typeof useGetFilmQuery>) => query.isLoading
  );

  // Vehicles
  const vehicleIds = person.vehicles.map(
    (vehicle: string) => vehicle.split("/").slice(-2, -1)[0]
  );
  const vehicleQueries = vehicleIds.map((id: string) => useGetVehicleQuery(id));
  const vehicles = vehicleQueries
    .map((query: ReturnType<typeof useGetVehicleQuery>) => query.data?.name)
    .filter(Boolean);
  const isLoadingVehicles = vehicleQueries.some(
    (query: ReturnType<typeof useGetVehicleQuery>) => query.isLoading
  );

  // Starships
  const starshipIds = person.starships.map(
    (starship: string) => starship.split("/").slice(-2, -1)[0]
  );
  const starshipQueries = starshipIds.map((id: string) =>
    useGetStarshipQuery(id)
  );
  const starships = starshipQueries
    .map((query: ReturnType<typeof useGetStarshipQuery>) => query.data?.name)
    .filter(Boolean);
  const isLoadingStarships = starshipQueries.some(
    (query: ReturnType<typeof useGetStarshipQuery>) => query.isLoading
  );

  return {
    homeworldData,
    films,
    vehicles,
    starships,
    isLoadingHomeworld,
    isLoadingFilms,
    isLoadingVehicles,
    isLoadingStarships,
  };
};
