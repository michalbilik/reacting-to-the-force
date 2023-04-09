import React, { useState, useEffect } from "react";
import { useGetPeopleByNameQuery } from "../api/starWarsApi";
import { useNavigate } from "react-router-dom";
import { IPeople } from "../api/starWarsApi";
import { useDebounce } from "../hooks/useDebounce";
import Loading from "./Loading";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchChanged, setSearchChanged] = useState(false);
  const { data, error, isLoading } = useGetPeopleByNameQuery(searchTerm, {
    skip: searchTerm.trim() === "",
  });

  const navigate = useNavigate();

  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    setSearchTerm(debouncedSearchValue);
    setSearchChanged(true);
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (data) {
      setSearchChanged(false);
    }
  }, [data]);

  const handlePersonClick = (person: IPeople) => {
    navigate(`/person/${person.name}`, { state: { person } });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center space-y-4 text-cyan-500">
      <div className="w-full max-w-md">
        <div className="flex items-center border border-yellow-300 rounded">
          <input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Search..."
            className="w-full p-2 rounded-l bg-transparent"
          />
        </div>
      </div>

      {(searchChanged && searchValue !== "") || isLoading ? (
        <Loading />
      ) : data?.results.length === 0 ? (
        <div>No results found.</div>
      ) : (
        data?.results.map((person: IPeople) => (
          <div
            key={person.name}
            onClick={() => handlePersonClick(person)}
            className="cursor-pointer"
          >
            <h3>{person.name}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default Search;
