import React from "react";
import { IPeople } from "../api";
import PersonCard from "./PersonCard";

const SearchResults = ({ people }: { people: IPeople[] }) => (
  <div>
    {people.map((person) => (
      <PersonCard key={person.name} person={person} />
    ))}
  </div>
);

export default SearchResults;
