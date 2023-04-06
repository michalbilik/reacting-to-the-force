import React, { useCallback } from "react";
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

  const handleSearch = useCallback(async () => {
    if (searchTerm.trim() === "") return;

    const fetchedPeople = await fetchPerson(searchTerm);
    dispatch(setPeople(fetchedPeople));
  }, [searchTerm, dispatch]);

  const handlePersonClick = (person: IPeople) => {
    dispatch(setSelectedPerson(person));
    navigate(`/person/${person.name}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full max-w-md">
        <div className="flex items-center border border-gray-300 rounded">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            onKeyDown={handleKeyPress}
            placeholder="Search..."
            className="w-full p-2 rounded-l"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 text-white bg-blue-500 rounded-r hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      {people.map((person) => (
        <div
          key={person.name}
          onClick={() => handlePersonClick(person)}
          className="cursor-pointer"
        >
          <h3>{person.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Search;
