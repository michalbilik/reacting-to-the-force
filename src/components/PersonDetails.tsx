import React from "react";
import { useAppSelector } from "../store/hooks";
import { IPeople } from "../api";

const PersonDetails: React.FC = () => {
  const selectedPerson: IPeople | null = useAppSelector(
    (state) => state.search.selectedPerson
  );

  if (!selectedPerson) {
    return <div>No person selected</div>;
  }

  return (
    <div>
      <h2>{selectedPerson.name}</h2>
      <p>Birth year: {selectedPerson.birth_year}</p>
      <p>Homeworld: {selectedPerson.homeworld}</p>
    </div>
  );
};

export default PersonDetails;
