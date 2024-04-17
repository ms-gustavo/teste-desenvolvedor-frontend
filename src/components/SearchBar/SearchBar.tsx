import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onTypeChange: (type: string) => void;
  searchType: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onTypeChange,
  searchType,
}) => {
  return (
    <div className="flex items-center space-x-2 w-full m-1 md:m-2">
      <div className="relative flex-grow">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Procurar por ${
            searchType === "name" ? "remédio" : "empresa"
          }`}
          className="pl-10 pr-3 py-2 rounded w-full border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <select
        value={searchType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="rounded border border-gray-300 bg-white py-2 px-3 text-gray-700"
      >
        <option value="name">Remédio</option>
        <option value="company">Empresa</option>
      </select>
    </div>
  );
};

export default SearchBar;
