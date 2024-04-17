import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchInputProps {
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
  return (
    <div className="relative w-full m-1 md:m-2">
      <input
        type="text"
        placeholder={placeholder}
        className="pl-10 pr-3 py-2 rounded w-full  border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchInput;
