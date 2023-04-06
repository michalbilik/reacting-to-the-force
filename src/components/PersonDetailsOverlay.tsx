import React from "react";
import { IPeople } from "../api";

interface PersonDetailsOverlayProps {
  person: IPeople;
  onClose: () => void;
}

const PersonDetailsOverlay: React.FC<PersonDetailsOverlayProps> = ({
  person,
  onClose,
}) => {
  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <h2>{person.name}</h2>
        <p>Birth year: {person.birth_year}</p>
        <p>Homeworld: {person.homeworld}</p>
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 0, right: 0 }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PersonDetailsOverlay;
