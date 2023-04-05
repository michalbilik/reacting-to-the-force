<<<<<<< HEAD
// src/components/Search.tsx
import React, { useState } from "react";
import { useSearchPeopleQuery } from "../starWarsApi";
=======
import React from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setPeople } from "../store/slices/searchSlice";
import { fetchPerson, IPeople } from "../api";
>>>>>>> parent of 28bce78 (Incorrect hook call fix :))
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

const Search = () => {
<<<<<<< HEAD
  const [searchTerm, setSearchTerm] = useState("");
  const { data: people, error, isLoading } = useSearchPeopleQuery(searchTerm);
  const handleSearch = () => {};
=======
  const people = useAppSelector((state) => state.search.people);
  const dispatch = useAppDispatch();

  const handleSearch = async () => {
    const searchTerm = useAppSelector((state) => state.search.searchTerm);
    const fetchedPeople = await fetchPerson(searchTerm);
    dispatch(setPeople(fetchedPeople));
  };
>>>>>>> parent of 28bce78 (Incorrect hook call fix :))

  return (
    <div>
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>An error occurred</p>}
      {people && <SearchResults people={people} />}
    </div>
  );
};

export default Search;
