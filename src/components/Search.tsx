// components/Search.tsx
import React from "react";
import { useAppSelector, useAppDispatch } from "./../store/hooks";
import {
  setSearchTerm,
  setPeople,
  setSelectedPerson,
  toggleOverlay,
} from "./../store/slices/searchSlice";
import { fetchPerson, IPeople } from "../api";
import PersonDetailsOverlay from "./PersonDetailsOverlay";

const Search = () => {
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const people = useAppSelector((state) => state.search.people);
  const selectedPerson = useAppSelector((state) => state.search.selectedPerson);
  const isOverlayOpen = useAppSelector((state) => state.search.isOverlayOpen);
  const dispatch = useAppDispatch();

  const handleSearch = async () => {
    const fetchedPeople = await fetchPerson(searchTerm);
    dispatch(setPeople(fetchedPeople));
  };

  const handlePersonClick = (person: IPeople) => {
    dispatch(setSelectedPerson(person));
    dispatch(toggleOverlay());
  };

  const closeOverlay = () => {
    dispatch(toggleOverlay());
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        placeholder="Search for a Star Wars character"
      />
      <button onClick={handleSearch}>Search</button>

      {people.map((person) => (
        <div key={person.name} onClick={() => handlePersonClick(person)}>
          <h3>{person.name}</h3>
        </div>
      ))}

      {isOverlayOpen && selectedPerson && (
        <PersonDetailsOverlay person={selectedPerson} onClose={closeOverlay} />
      )}
    </div>
  );
};

export default Search;
