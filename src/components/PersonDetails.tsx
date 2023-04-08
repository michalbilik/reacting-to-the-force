import { useLocation } from "react-router-dom";
import { IPeople } from "../api/starWarsApi";
import {
  useGetPlanetQuery,
  useGetFilmQuery,
  useGetSpeciesQuery,
  useGetVehicleQuery,
  useGetStarshipQuery,
} from "../api/starWarsApi";

const PersonDetails = () => {
  const { state } = useLocation();
  const person = state.person;

  if (!person) {
    return <div>Person not found</div>;
  }

  const homeworldId = person.homeworld.split("/").slice(-2, -1)[0];
  const { data: homeworldData } = useGetPlanetQuery(homeworldId);

  return (
    <div>
      <h2>{person.name}</h2>
      <p>Birth year: {person.birth_year}</p>
      <p>Height: {person.height} cm</p>
      <p>Mass: {person.mass} kg</p>
      <p>Hair color: {person.hair_color}</p>
      <p>Skin color: {person.skin_color}</p>
      <p>Eye color: {person.eye_color}</p>
      <p>Gender: {person.gender}</p>
      <p>Homeworld: {person.homeworld}</p>
      <p>Homeworld: {homeworldData?.name || "Loading..."}</p>
      <p>Films: {person.films.join(", ")}</p>
      <p>Species: {person.species.join(", ")}</p>
      <p>Vehicles: {person.vehicles.join(", ")}</p>
      <p>Starships: {person.starships.join(", ")}</p>
    </div>
  );
};

export default PersonDetails;
