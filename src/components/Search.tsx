// components/Search.tsx
import React from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setPeople } from "../store/slices/searchSlice";
import { fetchPerson, IPeople } from "../api";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

const Search = () => {
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const people = useAppSelector((state) => state.search.people);
  const dispatch = useAppDispatch();

  const handleSearch = async () => {
    const fetchedPeople = await fetchPerson(searchTerm);
    dispatch(setPeople(fetchedPeople));
  };

  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      <SearchResults people={people} />
    </div>
  );
};

export default Search;
