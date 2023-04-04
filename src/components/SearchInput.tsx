import React from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setSearchTerm } from "../store/slices/searchSlice";

const SearchInput = ({ onSearch }: { onSearch: () => void }) => {
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const dispatch = useAppDispatch();

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        placeholder="Search for a Star Wars character"
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchInput;
