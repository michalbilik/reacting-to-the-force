import React from "react";
import { IPeople } from "../api";

const PersonCard = ({ person }: { person: IPeople }) => (
  <div>
    <h3>{person.name}</h3>
    <p>Birth year: {person.birth_year}</p>
  </div>
);

export default PersonCard;
