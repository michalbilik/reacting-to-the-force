import React, { useState } from "react";
import { useGetPeopleByNameQuery } from "../api/starWarsApi";
import { useNavigate } from "react-router-dom";
import { IPeople } from "../api/starWarsApi";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, error, isLoading } = useGetPeopleByNameQuery(searchTerm, {
    skip: searchTerm.trim() === "",
  });

  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setSearchTerm((e.target as HTMLInputElement).value);
    }
  };

  const handlePersonClick = (person:IPeople) => {
    navigate(`/person/${person.name}`, { state: {person} });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full max-w-md">
        <div className="flex items-center border border-yellow-300 rounded">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm((e.target as HTMLInputElement).value)
            }
            onKeyDown={handleSearch}
            placeholder="Search..."
            className="w-full p-2 rounded-l"
          />
        </div>
      </div>

      {isLoading ? (
        <div>Loading...</div>
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
