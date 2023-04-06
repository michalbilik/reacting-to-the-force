import React from "react";
import { useAppSelector, useAppDispatch } from "./../store/hooks";
import {
  setSearchTerm,
  setPeople,
  setSelectedPerson,
} from "./../store/slices/searchSlice";
import { fetchPerson, IPeople } from "../api";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const people = useAppSelector((state) => state.search.people);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSearch = async () => {
    const fetchedPeople = await fetchPerson(searchTerm);
    dispatch(setPeople(fetchedPeople));
  };

  const handlePersonClick = (person: IPeople) => {
    dispatch(setSelectedPerson(person));
    navigate(`/person/${person.name}`);
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
    </div>
  );
};

export default Search;
