import { useLocation } from "react-router-dom";
import { IPeople } from "../api/starWarsApi";
import {
  useGetPlanetQuery,
  useGetFilmQuery,
  useGetSpeciesQuery,
  useGetVehicleQuery,
  useGetStarshipQuery,
} from "../api/starWarsApi";
import Loading from "./Loading";

const PersonDetails = () => {
  const { state } = useLocation();
  const person = state.person;

  if (!person) {
    return <div>Person not found</div>;
  }

  // Homeworld
  const homeworldId = person.homeworld.split("/").slice(-2, -1)[0];
  const { data: homeworldData } = useGetPlanetQuery(homeworldId);
  // Films
  const filmIds = person.films.map(
    (film: string) => film.split("/").slice(-2, -1)[0]
  );
  const filmQueries = filmIds.map((id: string) => useGetFilmQuery(id));
  const films = filmQueries
    .map((query: ReturnType<typeof useGetFilmQuery>) => query.data?.title)
    .filter(Boolean);

  // Vehicles
  const vehicleIds = person.vehicles.map(
    (vehicle: string) => vehicle.split("/").slice(-2, -1)[0]
  );
  const vehicleQueries = vehicleIds.map((id: string) => useGetVehicleQuery(id));
  const vehicles = vehicleQueries
    .map((query: ReturnType<typeof useGetVehicleQuery>) => query.data?.name)
    .filter(Boolean);

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

  return (
    <div>
      <h2>{person.name}</h2>
      <p>Birth year: {person.birth_year}</p>
      <p>Height: {person.height} cm</p>
      <p>Mass: {person.mass} kg</p>
      <div>Homeworld: {homeworldData?.name || <Loading />}</div>
      <div>Films: {films.length ? films.join(", ") : <Loading />}</div>
      <div>Vehicles: {vehicles.length ? vehicles.join(", ") : <Loading />}</div>
      <div>Starships: {starships.length ? starships.join(", ") : <Loading />}</div>
    </div>
  );
};

export default PersonDetails;
