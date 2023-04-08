import { useLocation } from "react-router-dom";
import { IPeople } from "../api/starWarsApi";

const PersonDetails = () => {
  const { state } = useLocation();
  const person = state.person;

  return (
    <div>
      <h2>{person.name}</h2>
      <p>Birth year: {person.birth_year}</p>
      <p>Height: {person.height} cm</p>
      <p>Mass: {person.mass} kg</p>
      <p>Hair color: {person.hair_color}</p>
      <p>Skin color: {person.skin_color}</p>
      <p>Eye color: {person.eye_color}</p>
    </div>
  );
};

export default PersonDetails;
