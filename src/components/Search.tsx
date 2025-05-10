import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IPeople } from "../api/starWarsApi";
import { useDebounce } from "../hooks/useDebounce";
import Loading from "./Loading";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [allCharacters, setAllCharacters] = useState<IPeople[] | null>(null);
  const [filteredData, setFilteredData] = useState<IPeople[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const debouncedSearchValue = useDebounce(searchValue, 500);

  // Fetch all characters once when component mounts
  useEffect(() => {
    const fetchAllCharacters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://swapi.info/api/people');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAllCharacters(data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsLoading(false);
      }
    };

    fetchAllCharacters();
  }, []);

  // Filter characters based on search input (minimum 3 characters)
  useEffect(() => {
    if (!allCharacters) return;

    if (debouncedSearchValue.trim().length < 3) {
      setFilteredData(null);
      return;
    }

    const searchTerm = debouncedSearchValue.toLowerCase();
    const filtered = allCharacters.filter(character =>
      character.name.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  }, [debouncedSearchValue, allCharacters]);

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
            className="w-full p-2 rounded-l bg-transparent"
            placeholder="Search character"
          />
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <div>Error: {error}</div>
      ) : searchValue.trim().length < 3 ? (
        <div>Enter at least 3 characters to search...</div>

      ) : filteredData && filteredData.length === 0 ? (
        <div>No results found.</div>
      ) : (
        filteredData?.map((person: IPeople) => (
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
