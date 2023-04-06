import React from "react";
import { useAppSelector } from "../store/hooks";
import { IPeople } from "../api";
import { useNavigate } from "react-router-dom";

const PersonDetails: React.FC = () => {
  const selectedPerson: IPeople | null = useAppSelector(
    (state) => state.search.selectedPerson
  );
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  if (!selectedPerson) {
    return <div>No person selected</div>;
  }

  return (
    <div>
      <h2>{selectedPerson.name}</h2>
      <p>Birth year: {selectedPerson.birth_year}</p>
      <p>Homeworld: {selectedPerson.homeworld}</p>
      <button
        onClick={goBack}
        className="px-4 py-2 text-white bg-blue-500 rounded-r hover:bg-blue-600"
      >
        Go Back
      </button>
    </div>
  );
};

export default PersonDetails;
