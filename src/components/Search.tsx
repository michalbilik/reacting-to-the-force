// src/components/Search.tsx
import React, { useState } from "react";
import { useSearchPeopleQuery } from "../starWarsApi";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: people, error, isLoading } = useSearchPeopleQuery(searchTerm);
  const handleSearch = () => {};

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
